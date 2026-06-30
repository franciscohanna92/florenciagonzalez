import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import { serializeJsonLd } from "../src/lib/json-ld.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appOutput = path.join(root, ".next", "server", "app");
const canonicalOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://florenciagonzalez.vercel.app";
const projects = JSON.parse(
  await readFile(
    path.join(root, "src", "data", "scraped-projects.json"),
    "utf8",
  ),
);
const topLevelRoutes = [
  "/",
  "/proyectos",
  "/servicios",
  "/como-trabajo",
  "/sobre-mi",
  "/contacto",
];
const projectRoutes = projects.map((project) => `/proyectos/${project.slug}`);
const routes = [...topLevelRoutes, ...projectRoutes];
const requiredNavigation = [
  "/proyectos",
  "/servicios",
  "/como-trabajo",
  "/sobre-mi",
  "/contacto",
];

function outputPathForRoute(route) {
  return route === "/"
    ? path.join(appOutput, "index.html")
    : path.join(appOutput, `${route.slice(1)}.html`);
}

function normalizeCanonical(value) {
  const url = new URL(value);
  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
  return `${url.origin}${pathname}`;
}

function assertHeadingOrder($, route) {
  let previousLevel = 0;

  for (const heading of $("h1,h2,h3,h4,h5,h6").toArray()) {
    const level = Number(heading.tagName.slice(1));
    assert.ok(
      previousLevel === 0 || level <= previousLevel + 1,
      `${route} skips heading levels from h${previousLevel} to h${level}`,
    );
    previousLevel = level;
  }
}

function findMetadataBody(name) {
  const candidates = [
    path.join(appOutput, name, "route.body"),
    path.join(appOutput, `${name}.body`),
  ];
  const match = candidates.find(existsSync);
  assert.ok(match, `Missing generated ${name} body`);
  return match;
}

const titles = new Set();
const descriptions = new Set();

for (const route of routes) {
  const file = outputPathForRoute(route);
  assert.ok(existsSync(file), `Missing prerendered HTML for ${route}`);
  const html = await readFile(file, "utf8");
  const $ = cheerio.load(html);
  const title = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim();
  const canonical = $('link[rel="canonical"]').attr("href");

  assert.ok(title, `${route} has no title`);
  assert.ok(description, `${route} has no description`);
  assert.equal(
    normalizeCanonical(canonical),
    normalizeCanonical(new URL(route, canonicalOrigin).toString()),
    `${route} has the wrong canonical`,
  );
  assert.equal($("h1").length, 1, `${route} must render exactly one h1`);
  assert.ok(
    $('meta[property="og:title"]').attr("content"),
    `${route} lacks og:title`,
  );
  assert.ok(
    $('meta[property="og:image"]').attr("content"),
    `${route} lacks og:image`,
  );
  assert.ok(
    $('meta[name="twitter:card"]').attr("content"),
    `${route} lacks Twitter metadata`,
  );
  assert.ok(!titles.has(title), `Duplicate title: ${title}`);
  assert.ok(
    !descriptions.has(description),
    `Duplicate description: ${description}`,
  );
  titles.add(title);
  descriptions.add(description);
  assertHeadingOrder($, route);

  const hrefs = new Set(
    $("a[href]")
      .map((_, link) => $(link).attr("href"))
      .get(),
  );
  for (const requiredHref of requiredNavigation) {
    assert.ok(
      hrefs.has(requiredHref),
      `${route} does not link to ${requiredHref}`,
    );
  }

  const jsonLdScripts = $('script[type="application/ld+json"]');
  assert.ok(jsonLdScripts.length > 0, `${route} has no JSON-LD`);
  jsonLdScripts.each((_, script) => {
    const raw = $(script).html() ?? "";
    assert.doesNotThrow(
      () => JSON.parse(raw),
      `${route} contains invalid JSON-LD`,
    );
    assert.ok(!raw.includes("<"), `${route} JSON-LD contains unescaped markup`);
    for (const unsupportedProperty of [
      '"aggregateRating"',
      '"review"',
      '"openingHours"',
      '"address"',
      '"alumniOf"',
    ]) {
      assert.ok(
        !raw.includes(unsupportedProperty),
        `${route} asserts unverified ${unsupportedProperty}`,
      );
    }
  });

  const seoHead = $("head").html() ?? "";
  assert.ok(
    !seoHead.includes("localhost"),
    `${route} metadata contains localhost`,
  );
  assert.ok(
    !seoHead.includes("vercel.app") || seoHead.includes(canonicalOrigin),
    `${route} metadata contains a preview host`,
  );
}

const sitemapXml = await readFile(findMetadataBody("sitemap.xml"), "utf8");
const sitemap = cheerio.load(sitemapXml, { xmlMode: true });
const sitemapUrls = sitemap("loc")
  .map((_, loc) => sitemap(loc).text())
  .get();
const expectedUrls = routes.map((route) =>
  new URL(route, canonicalOrigin).toString(),
);
assert.deepEqual(
  [...sitemapUrls].sort(),
  [...expectedUrls].sort(),
  "Sitemap routes differ from canonical routes",
);
assert.equal(
  new Set(sitemapUrls).size,
  sitemapUrls.length,
  "Sitemap contains duplicate URLs",
);

const robotsText = await readFile(findMetadataBody("robots.txt"), "utf8");
assert.match(
  robotsText,
  /Allow: \/(?:\n|$)/,
  "robots.txt must allow public crawling",
);
assert.ok(
  robotsText.includes(new URL("/sitemap.xml", canonicalOrigin).toString()),
  "robots.txt lacks the canonical sitemap URL",
);

const injectionProbe = serializeJsonLd({
  value: "</script><script>alert(1)</script>",
});
assert.ok(
  !injectionProbe.includes("<"),
  "JSON-LD serializer did not escape markup-breaking characters",
);

console.log(`SEO validation passed for ${routes.length} canonical pages.`);
