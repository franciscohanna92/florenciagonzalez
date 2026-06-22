"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/container";
import { navItems, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        headerContainerRef.current &&
        !headerContainerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-[5.75rem] overflow-visible transition-all duration-300",
        isScrolled
          ? "border-transparent bg-transparent pt-3"
          : isMenuOpen
            ? "bg-transparent pt-3"
            : "bg-transparent",
      )}
    >
      <Container
        className={cn(
          "relative flex flex-wrap items-center justify-between gap-x-5 overflow-hidden bg-background/58 backdrop-blur-2xl backdrop-saturate-150 transition-[max-width,border-radius,padding,box-shadow,background-color,backdrop-filter] duration-500",
          isScrolled || isMenuOpen
            ? "max-w-[calc(100%-1rem)] rounded-3xl px-3 py-3 shadow-[0_18px_60px_rgba(45,41,38,0.14)] sm:px-4 lg:max-w-6xl"
            : "py-4",
        )}
        ref={headerContainerRef}
      >
        <Link
          className="group inline-flex max-w-max flex-col text-foreground"
          href="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="font-[var(--display)] text-2xl leading-none">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {siteConfig.descriptor}
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="transition-colors hover:text-foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface-strong/70 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={20} weight="regular" />
          ) : (
            <List aria-hidden="true" size={22} weight="regular" />
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.nav
              animate={{ height: "auto", opacity: 1 }}
              aria-label="Navegación principal móvil"
              className="w-full overflow-hidden md:hidden"
              exit={{ height: 0, opacity: 0 }}
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.ul
                animate="open"
                className="grid gap-7 pt-6 pb-2"
                initial="closed"
                variants={{
                  closed: {},
                  open: {
                    transition: {
                      delayChildren: 0.06,
                      staggerChildren: 0.04,
                    },
                  },
                }}
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      closed: { opacity: 0, y: -8 },
                      open: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      className="block font-[var(--display)] text-3xl leading-none text-foreground underline-offset-4 hover:underline"
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}
