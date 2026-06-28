"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

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
    <header className="fixed inset-x-0 top-0 z-40 bg-transparent">
      <div
        className={cn(
          "relative bg-background/58 backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-300 ease-out",
          (isScrolled || isMenuOpen) &&
            "shadow-[0_18px_60px_rgba(45,41,38,0.14)]",
        )}
        ref={headerContainerRef}
      >
        <div className="flex items-center justify-between gap-x-5 px-5 py-3 sm:px-8 lg:px-10">
          <Link
            className="group inline-flex max-w-max flex-col text-foreground"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="font-heading text-2xl leading-none">
              {siteConfig.name}
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {siteConfig.descriptor}
            </span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden md:block">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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

          <Button
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            size="icon"
            type="button"
            variant="ghost"
          >
            {isMenuOpen ? (
              <XIcon aria-hidden="true" />
            ) : (
              <MenuIcon aria-hidden="true" />
            )}
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.nav
              animate={{ height: "auto", opacity: 1 }}
              aria-label="Navegación principal móvil"
              className="overflow-hidden md:hidden"
              exit={{ height: 0, opacity: 0 }}
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ul className="grid gap-7 px-5 py-5 sm:px-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="block font-heading text-3xl leading-none text-foreground underline-offset-4 hover:underline"
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
