import {
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Container } from "@/components/container";
import { navItems, siteConfig } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t bg-foreground text-background">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-heading text-3xl">{siteConfig.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-background/65">
            {siteConfig.descriptor}
          </p>
        </div>

        <nav aria-label="Navegación secundaria">
          <p className="text-sm font-semibold text-background">
            Mapa del sitio
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-background/70">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-background" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-background">Contacto</p>
          <dl className="mt-4 flex flex-col gap-2 text-sm text-background/70">
            <div>
              <dt className="sr-only">WhatsApp</dt>
              <dd className="flex items-center gap-2">
                <WhatsappLogoIcon
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                <a
                  className="hover:text-background"
                  href={siteConfig.whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  {siteConfig.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Email</dt>
              <dd className="flex items-center gap-2">
                <EnvelopeSimpleIcon
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                <a
                  className="hover:text-background"
                  href={siteConfig.emailHref}
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Instagram</dt>
              <dd className="flex items-center gap-2">
                <InstagramLogoIcon
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                <a
                  className="hover:text-background"
                  href={siteConfig.instagramHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  {siteConfig.instagram}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
      <Container className="border-background/15 border-t py-5 text-xs text-background/55">
        © {year} Florencia González. Todos los derechos reservados.
      </Container>
    </footer>
  );
}
