// Captures a hero screenshot of every client website listed in lib/content.ts.
// Needs Node 22.18 or newer, which can import the TypeScript content file.
//
//   npx playwright install chromium        (once per machine)
//   npm run capture:websites               (every site)
//   npm run capture:websites -- kings      (only the given slugs)
//
// Each screenshot is saved to public/websites/<slug>.jpg at 1440x900, the
// same 16:10 frame as the browser preview. Set the site's `image` field to
// "/websites/<slug>.jpg" to show it on the page.

import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { websites } from "../lib/content.ts";

const outDir = fileURLToPath(new URL("../public/websites/", import.meta.url));
const only = process.argv.slice(2);
const targets = only.length
  ? websites.filter((site) => only.includes(site.slug))
  : websites;

// Buttons that dismiss cookie banners and newsletter popups.
const DISMISS = /^(accept|accept all|accept cookies|allow all|agree|i agree|got it|ok|okay|close|no thanks|no, thanks)$/i;

// Widgets that float over the hero: cookie bars, popups, chat bubbles.
const HIDE = [
  "#shopify-pc__banner",
  "#onetrust-banner-sdk",
  "#CybotCookiebotDialog",
  ".cc-window",
  "#cookie-law-info-bar",
  ".cky-consent-container",
  "#cmplz-cookiebanner-container",
  "[class*='klaviyo-form']",
  "#tidio-chat",
  "#hubspot-messages-iframe-container",
  ".intercom-lightweight-app",
  "#crisp-chatbox",
  ".tawk-min-container",
  "iframe[title*='chat' i]",
  "[class*='whatsapp' i]",
  "[id*='whatsapp' i]",
  "#credential_picker_container",
  ".grecaptcha-badge",
  "#cookie-popup",
  "[class*='zsiq']"
];

async function dismissOverlays(page) {
  for (const frame of page.frames()) {
    const buttons = await frame.getByRole("button", { name: DISMISS }).all();

    for (const button of buttons) {
      if (await button.isVisible().catch(() => false)) {
        await button.click({ timeout: 2000 }).catch(() => {});
      }
    }
  }

  await page.keyboard.press("Escape");
  await page.addStyleTag({
    content: `${HIDE.join(",")} { display: none !important; }`
  });
}

if (!targets.length) {
  console.error(`No websites match: ${only.join(", ")}`);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  // Route through HTTPS_PROXY when one is configured.
  proxy: process.env.HTTPS_PROXY
    ? { server: process.env.HTTPS_PROXY, bypass: process.env.NO_PROXY }
    : undefined
});

for (const site of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    locale: "en-US"
  });

  try {
    await page.goto(site.url, { waitUntil: "load", timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});

    // Some sites send automated visitors elsewhere; never save the wrong page.
    const host = new URL(page.url()).hostname.replace(/^www\./, "");
    if (host !== site.domain) {
      throw new Error(`redirected to ${page.url()}`);
    }

    // Wait for images in the first screen to finish loading.
    await page
      .waitForFunction(
        () =>
          [...document.images]
            .filter((image) => image.getBoundingClientRect().top < innerHeight)
            .every((image) => image.complete),
        null,
        { timeout: 15_000 }
      )
      .catch(() => {});

    // Give delayed popups and hero animations time to appear, then clear them.
    await page.waitForTimeout(3500);
    await dismissOverlays(page);
    await page.waitForTimeout(1000);

    const file = `${outDir}${site.slug}.jpg`;

    await page.screenshot({
      path: file,
      type: "jpeg",
      quality: 82,
      animations: "disabled"
    });
    console.log(`Saved ${site.slug}: public/websites/${site.slug}.jpg`);
  } catch (error) {
    console.error(`Failed ${site.slug} (${site.url}): ${error.message}`);
    process.exitCode = 1;
  } finally {
    await page.close();
  }
}

await browser.close();
