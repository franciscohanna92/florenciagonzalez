import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const PROJECT_URLS = [
  "https://www.behance.net/gallery/251560199/Remodelacion-cocina",
  "https://www.behance.net/gallery/251559415/Lucila-Caf",
  "https://www.behance.net/gallery/237853499/CASA-VP",
  "https://www.behance.net/gallery/242104211/KUBO",
  "https://www.behance.net/gallery/237853287/CASA-PR",
  "https://www.behance.net/gallery/237853113/ROCKET-RAPI-WASH",
  "https://www.behance.net/gallery/237851897/MILLON",
  "https://www.behance.net/gallery/237851091/CASA-VS",
  "https://www.behance.net/gallery/237841627/CASA-JR",
  "https://www.behance.net/gallery/236203073/-quem-",
  "https://www.behance.net/gallery/220208519/VALLEJO-CALZADOS",
  "https://www.behance.net/gallery/220207541/ALPINESTARS",
  "https://www.behance.net/gallery/216519417/CASA-JM-VISUALIZACION",
  "https://www.behance.net/gallery/213428515/Food-Market",
  "https://www.behance.net/gallery/208212343/Mokka-Caf-Espacio-San-Juan",
  "https://www.behance.net/gallery/206148157/MOKKA-CAFE-CHILE",
  "https://www.behance.net/gallery/206067477/Exterior-3D-Visualizacion",
  "https://www.behance.net/gallery/184874039/Espacio-de-juegos",
  "https://www.behance.net/gallery/171349449/Diseno-Cocina",
  "https://www.behance.net/gallery/167356097/Bathroom",
  "https://www.behance.net/gallery/157892927/WINE-BAR",
  "https://www.behance.net/gallery/157861915/MOKKA",
  "https://www.behance.net/gallery/149649543/ESPACIO-M",
  "https://www.behance.net/gallery/149648581/CAFE-DEL-PATIO",
  "https://www.behance.net/gallery/130050877/BISTREA-CAFETTO",
  "https://www.behance.net/gallery/129997819/Casa-AR",
];

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
    "Mozilla/5.0 (compatible; FlorenciaPortfolioScraper/2.0; +https://www.behance.net/florencia1112)",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(url, { headers: REQUEST_HEADERS });

    if (response.ok) {
      return response;
    }

    if (attempt === 3 || (response.status < 500 && response.status !== 429)) {
      throw new Error(`Could not fetch ${url}: ${response.status}`);
    }

    await sleep(attempt * 1000);
  }

  throw new Error(`Could not fetch ${url}`);
}

async function fetchText(url) {
  return (await fetchWithRetry(url)).text();
}

async function fetchBuffer(url) {
  const response = await fetchWithRetry(url);

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
    haystack.includes("eventos") ||
    haystack.includes("lucila") ||
    haystack.includes("kubo") ||
    haystack.includes("quem")
  ) {
    return "Comercial";
  }

  if (
    haystack.includes("mueble") ||
    haystack.includes("cocina") ||
    haystack.includes("bathroom") ||
    haystack.includes("baño") ||
    haystack.includes("juegos") ||
    haystack.includes("remodelación")
  ) {
    return "Interiorismo";
  }

  if (haystack.includes("casa")) {
    return "Vivienda";
  }

  return "Interiorismo";
}

function getBehanceProject(html, sourceUrl) {
  const $ = cheerio.load(html);
  const stateJson = $("#beconfig-store_state").html();

  if (!stateJson) {
    throw new Error(`Behance project data was not found in ${sourceUrl}`);
  }

  const project = JSON.parse(stateJson).project?.project;

  if (!project?.name || !Array.isArray(project.allModules)) {
    throw new Error(`Behance project data is incomplete in ${sourceUrl}`);
  }

  return project;
}

function imageAssetKey(url) {
  return path.basename(new URL(url).pathname);
}

function imageTypePriority(type) {
  return ["JPG", "JPEG", "PNG", "GIF", "WEBP"].indexOf(type);
}

function chooseLargestImage(candidates) {
  return candidates
    .filter((candidate) => candidate.url)
    .toSorted((a, b) => {
      const widthDifference =
        (b.width ?? Number.MAX_SAFE_INTEGER) -
        (a.width ?? Number.MAX_SAFE_INTEGER);

      if (widthDifference !== 0) {
        return widthDifference;
      }

      return imageTypePriority(a.type) - imageTypePriority(b.type);
    })[0];
}

function getProjectImageUrls(project) {
  const images = new Map();

  function visit(value) {
    if (!value || typeof value !== "object") {
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        visit(item);
      }

      return;
    }

    if (Array.isArray(value.imageSizes?.allAvailable)) {
      const image = chooseLargestImage(value.imageSizes.allAvailable);

      if (image?.url?.includes("/project_modules/")) {
        images.set(imageAssetKey(image.url), image.url);
      }

      return;
    }

    for (const child of Object.values(value)) {
      visit(child);
    }
  }

  visit(project.allModules);

  return [...images.values()];
}

function extensionFrom(contentType, url) {
  if (contentType.includes("webp")) {
    return "webp";
  }

  if (contentType.includes("png")) {
    return "png";
  }

  if (contentType.includes("gif")) {
    return "gif";
  }

  const extension = path.extname(new URL(url).pathname).replace(".", "");

  return extension.toLowerCase() === "jpeg" ? "jpg" : extension.toLowerCase();
}

async function downloadImages(project, imageUrls) {
  const projectDir = path.join(PUBLIC_PROJECTS_DIR, project.slug);
  const images = [];

  await mkdir(projectDir, { recursive: true });

  for (const [index, imageUrl] of imageUrls.entries()) {
    const { buffer, contentType } = await fetchBuffer(imageUrl);
    const extension = extensionFrom(contentType, imageUrl);
    const fileName = `${String(index + 1).padStart(2, "0")}.${extension}`;
    const publicPath = `/projects/${project.slug}/${fileName}`;

    await writeFile(path.join(projectDir, fileName), buffer);

    images.push({
      src: publicPath,
      alt:
        index === 0
          ? `Imagen principal del proyecto ${project.title}`
          : `Imagen ${index + 1} del proyecto ${project.title}`,
      cover: index === 0,
    });
  }

  return images;
}

async function scrapeProject(sourceUrl, feature) {
  const projectData = getBehanceProject(await fetchText(sourceUrl), sourceUrl);
  const title = cleanText(projectData.name);
  const slug = toSlug(title);
  const context = [projectData.description, projectData.tags]
    .flat()
    .filter(Boolean)
    .map((value) => (typeof value === "string" ? value : JSON.stringify(value)))
    .join(" ");
  const category = inferCategory(title, context);
  const imageUrls = getProjectImageUrls(projectData);
  const images = await downloadImages({ title, slug }, imageUrls);

  return {
    title,
    slug,
    category,
    year: projectData.publishedOn
      ? String(new Date(projectData.publishedOn * 1000).getUTCFullYear())
      : "",
    location: LOCATION,
    services: CATEGORY_SERVICES[category],
    challenge: "",
    solution: "",
    result: "",
    feature,
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
  await rm(PUBLIC_PROJECTS_DIR, { recursive: true, force: true });
  await mkdir(PUBLIC_PROJECTS_DIR, { recursive: true });

  const projects = [];
  const warnings = [];

  console.log(`Scraping ${PROJECT_URLS.length} Behance projects.`);

  for (const [index, sourceUrl] of PROJECT_URLS.entries()) {
    console.log(`[${index + 1}/${PROJECT_URLS.length}] ${sourceUrl}`);

    try {
      const feature = index === 0 ? "hero" : index <= 4 ? "home" : null;
      const project = await scrapeProject(sourceUrl, feature);

      if (project.images.length === 0) {
        warnings.push(`${project.title} has no images.`);
      }

      projects.push(project);
    } catch (error) {
      warnings.push(
        `${sourceUrl} failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    await sleep(200);
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
