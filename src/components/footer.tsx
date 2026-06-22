import Link from "next/link";
import { Container } from "@/components/container";
import { navItems, siteConfig } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t bg-foreground text-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-[var(--display)] text-3xl">{siteConfig.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-surface/65">
            {siteConfig.descriptor}
          </p>
          <p className="mt-6 max-w-sm text-sm leading-6 text-surface/75">
            {siteConfig.location}
            <br />
            {siteConfig.remoteWork}
          </p>
        </div>

        <nav aria-label="Navegación secundaria">
          <p className="text-sm font-semibold text-surface">Mapa del sitio</p>
          <ul className="mt-4 space-y-2 text-sm text-surface/70">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-surface" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-surface">Contacto</p>
          <dl className="mt-4 space-y-2 text-sm text-surface/70">
            <div>
              <dt className="sr-only">WhatsApp</dt>
              <dd>
                <a
                  className="hover:text-surface"
                  href={siteConfig.whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp: {siteConfig.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Email</dt>
              <dd>Email: {siteConfig.email}</dd>
            </div>
            <div>
              <dt className="sr-only">Instagram</dt>
              <dd>Instagram: {siteConfig.instagram}</dd>
            </div>
          </dl>
        </div>
      </Container>
      <Container className="border-surface/15 border-t py-5 text-xs text-surface/55">
        © {year} Florencia González. Todos los derechos reservados.
      </Container>
    </footer>
  );
}
