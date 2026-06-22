import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const SOURCE_ORIGIN = "https://gonzalezflorencialuz.myportfolio.com";
const WORK_URL = `${SOURCE_ORIGIN}/work`;
const ROOT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const PUBLIC_PROJECTS_DIR = path.join(ROOT_DIR, "public", "projects");
const OUTPUT_JSON_PATH = path.join(
  ROOT_DIR,
  "src",
  "data",
  "scraped-projects.json",
);
const LOCATION = "San Juan, Argentina";

const CATEGORY_SERVICES = {
  Vivienda: ["Diseño arquitectónico", "Visualización 3D", "Documentación"],
  Comercial: ["Diseño comercial", "Aplicación de marca", "Mobiliario"],
  Interiorismo: ["Diseño interior", "Mobiliario a medida", "Visualización 3D"],
  Mobiliario: ["Mobiliario a medida", "Detalles funcionales", "Seguimiento"],
  "Visualización 3D": ["Visualización 3D", "Renders", "Comunicación visual"],
};

const REQUEST_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (compatible; FlorenciaPortfolioScraper/1.0; +https://gonzalezflorencialuz.myportfolio.com/)",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url) {
  const response = await fetch(url, { headers: REQUEST_HEADERS });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}: ${response.status}`);
  }

  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, { headers: REQUEST_HEADERS });

  if (!response.ok) {
    throw new Error(`Could not download ${url}: ${response.status}`);
  }

  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get("content-type") ?? "",
  };
}

function cleanText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function toSlug(value) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function absoluteUrl(value) {
  if (!value || value.startsWith("data:")) {
    return null;
  }

  return new URL(value, SOURCE_ORIGIN).toString();
}

function parseSrcset(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((candidate) => {
      const [url, descriptor] = candidate.trim().split(/\s+/);
      const width = Number.parseInt(descriptor?.replace("w", "") ?? "0", 10);

      return {
        url: absoluteUrl(url),
        width: Number.isNaN(width) ? 0 : width,
      };
    })
    .filter((candidate) => candidate.url);
}

function bestImageUrl($element) {
  const candidates = [
    ...parseSrcset($element.attr("data-srcset")),
    ...parseSrcset($element.attr("srcset")),
  ];

  for (const attr of ["data-src", "src"]) {
    const url = absoluteUrl($element.attr(attr));

    if (url) {
      candidates.push({ url, width: inferWidthFromUrl(url) });
    }
  }

  const lightboxUrl = absoluteUrl(
    $element.closest(".js-lightbox").attr("data-src"),
  );

  if (lightboxUrl) {
    candidates.push({
      url: lightboxUrl,
      width: inferWidthFromUrl(lightboxUrl),
    });
  }

  candidates.sort((a, b) => b.width - a.width);

  return candidates[0]?.url ?? null;
}

function inferWidthFromUrl(url) {
  const widthMatch = url.match(/(?:_rw_|x)(\d{2,5})(?:\.|x)/);

  if (widthMatch) {
    return Number.parseInt(widthMatch[1], 10);
  }

  return url.includes("_car_") ? 1400 : 9999;
}

function assetKey(url) {
  const { origin, pathname } = new URL(url);
  const extension = path.extname(pathname);
  const baseName = path.basename(pathname, extension).replace(/_.+$/, "");

  return `${origin}${path.dirname(pathname)}/${baseName}`;
}

function extensionFrom(url, contentType) {
  const extension = path.extname(new URL(url).pathname).replace(".", "");

  if (extension) {
    return extension.toLowerCase() === "jpeg" ? "jpg" : extension.toLowerCase();
  }

  if (contentType.includes("png")) {
    return "png";
  }

  if (contentType.includes("webp")) {
    return "webp";
  }

  return "jpg";
}

function collectText($, selector) {
  const parts = [];

  $(selector).each((_, element) => {
    const blockParts = $(element)
      .find(".rich-text > *, p, li")
      .map((__, child) => cleanText($(child).text()))
      .get()
      .filter(Boolean);

    if (blockParts.length > 0) {
      parts.push(...blockParts);
    } else {
      const text = cleanText($(element).text());

      if (text) {
        parts.push(text);
      }
    }
  });

  return cleanText(parts.join(" "));
}

function inferCategory(title, text) {
  const haystack = `${title} ${text}`.toLowerCase();

  if (haystack.includes("visualiz") || haystack.includes("3d")) {
    return "Visualización 3D";
  }

  if (
    haystack.includes("mokka") ||
    haystack.includes("cafe") ||
    haystack.includes("café") ||
    haystack.includes("bar") ||
    haystack.includes("market") ||
    haystack.includes("calzados") ||
    haystack.includes("wash") ||
    haystack.includes("alpinestars") ||
    haystack.includes("eventos")
  ) {
    return "Comercial";
  }

  if (
    haystack.includes("mueble") ||
    haystack.includes("cocina") ||
    haystack.includes("bathroom") ||
    haystack.includes("baño") ||
    haystack.includes("juegos")
  ) {
    return "Interiorismo";
  }

  if (haystack.includes("casa")) {
    return "Vivienda";
  }

  return "Interiorismo";
}

function inferStatus(title, text) {
  const haystack = `${title} ${text}`.toLowerCase();

  if (haystack.includes("visualiz") || haystack.includes("3d")) {
    return "Visualización 3D";
  }

  return "Proyecto";
}

function buildFallbackDescription(title, category) {
  return `${title} es un proyecto de ${category.toLowerCase()} desarrollado por Florencia González.`;
}

function buildProjectCopy(title, category, text) {
  const description = text || buildFallbackDescription(title, category);
  const excerpt =
    description.length > 170
      ? `${description.slice(0, 167).trim()}...`
      : description;

  return {
    excerpt,
    description,
    challenge:
      "El punto de partida fue ordenar necesidades, usos y criterios espaciales para comunicar el proyecto con claridad.",
    solution:
      "La propuesta desarrolla una respuesta de diseño apoyada en distribución, materialidad, escala e imágenes de presentación.",
    result:
      "El material documenta el estado del proyecto y sirve como base para evaluación, comunicación y próximos ajustes.",
  };
}

function getProjectSummaries(html) {
  const $ = cheerio.load(html);

  return $("a.project-cover")
    .map((_, element) => {
      const $cover = $(element);
      const href = $cover.attr("href");
      const title = cleanText($cover.find(".title").first().text());
      const year = cleanText($cover.find(".date").first().text());
      const coverUrl = bestImageUrl($cover.find("img").first());
      const sourceUrl = absoluteUrl(href);

      if (!href || !title || !sourceUrl) {
        return null;
      }

      return {
        title,
        slug: toSlug(href.replace(/^\//, "")) || toSlug(title),
        year,
        coverUrl,
        sourceUrl,
      };
    })
    .get()
    .filter(Boolean);
}

function getProjectImages($, coverUrl) {
  const imageMap = new Map();

  if (coverUrl) {
    imageMap.set(assetKey(coverUrl), coverUrl);
  }

  $("#project-modules")
    .find(".js-lightbox, img")
    .each((_, element) => {
      const url = bestImageUrl($(element));

      if (!url || !url.includes("cdn.myportfolio.com")) {
        return;
      }

      imageMap.set(assetKey(url), url);
    });

  return [...imageMap.values()];
}

async function downloadImages(project, imageUrls) {
  const projectDir = path.join(PUBLIC_PROJECTS_DIR, project.slug);
  const images = [];

  await mkdir(projectDir, { recursive: true });

  for (const [index, imageUrl] of imageUrls.entries()) {
    const imageNumber = String(index + 1).padStart(2, "0");
    const imageRole = index === 0 ? "cover" : "gallery";
    const { buffer, contentType } = await fetchBuffer(imageUrl);
    const extension = extensionFrom(imageUrl, contentType);
    const fileName = `${imageNumber}-${imageRole}.${extension}`;
    const absolutePath = path.join(projectDir, fileName);
    const publicPath = `/projects/${project.slug}/${fileName}`;

    await writeFile(absolutePath, buffer);

    images.push({
      src: publicPath,
      alt:
        index === 0
          ? `Imagen principal del proyecto ${project.title}`
          : `Imagen ${index + 1} del proyecto ${project.title}`,
      originalUrl: imageUrl,
    });
  }

  return images;
}

async function scrapeProject(summary) {
  const html = await fetchText(summary.sourceUrl);
  const $ = cheerio.load(html);
  const title =
    cleanText($(".page-header .title").first().text()) || summary.title;
  const bodyText = collectText($, "#project-modules .project-module-text");
  const category = inferCategory(title, bodyText);
  const imageUrls = getProjectImages($, summary.coverUrl);
  const images = await downloadImages({ ...summary, title }, imageUrls);
  const copy = buildProjectCopy(title, category, bodyText);

  return {
    title,
    slug: summary.slug,
    category,
    year: summary.year,
    status: inferStatus(title, bodyText),
    location: LOCATION,
    services: CATEGORY_SERVICES[category],
    ...copy,
    sourceUrl: summary.sourceUrl,
    images,
  };
}

function stringifyProjects(projects) {
  return `${JSON.stringify(projects, null, 2).replace(
    /"services": \[\n\s+"([^"]+)",\n\s+"([^"]+)",\n\s+"([^"]+)"\n\s+\]/g,
    '"services": ["$1", "$2", "$3"]',
  )}\n`;
}

async function main() {
  await mkdir(PUBLIC_PROJECTS_DIR, { recursive: true });

  const workHtml = await fetchText(WORK_URL);
  const summaries = getProjectSummaries(workHtml);

  if (summaries.length === 0) {
    throw new Error(`No projects found in ${WORK_URL}`);
  }

  console.log(`Found ${summaries.length} projects.`);

  const projects = [];
  const warnings = [];

  for (const [index, summary] of summaries.entries()) {
    console.log(
      `[${index + 1}/${summaries.length}] Scraping ${summary.title}...`,
    );

    try {
      const project = await scrapeProject(summary);

      if (project.images.length === 0) {
        warnings.push(`${project.title} has no images.`);
      }

      projects.push(project);
    } catch (error) {
      warnings.push(
        `${summary.title} failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    await sleep(150);
  }

  await writeFile(OUTPUT_JSON_PATH, stringifyProjects(projects));

  console.log(`Wrote ${projects.length} projects to ${OUTPUT_JSON_PATH}`);

  if (warnings.length > 0) {
    console.warn("\nWarnings:");

    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
