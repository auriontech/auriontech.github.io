"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa6";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="bg-background shadow-md">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Adol Tech
            </Link>
            <div className="w-9 h-9" /> {/* Placeholder for button */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background shadow-md">
      <div className="container-custom py-4">
        <div className="flex flex-row justify-between items-center gap-4 sm:gap-0">
          <Link title="Adol Tech" href="/" className="text-xl font-bold">
            Adol Tech
          </Link>
          <div className="flex flex-row items-center gap-4">
            <Link
              title="Buy me a coffee"
              href="https://www.buymeacoffee.com/adol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-primary-600 transition-colors"
            >
              <span className="hidden sm:inline">Buy me a coffee ☕</span>
              <span className="inline sm:hidden">☕</span>
            </Link>
            <button
              onClick={() =>
                setTheme(
                  theme === "light"
                    ? "dark"
                    : theme === "dark"
                      ? "system"
                      : "light"
                )
              }
              title="Toggle theme"
              className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            >
              {theme === "light" && <FaSun className="w-5 h-5" />}
              {theme === "dark" && <FaMoon className="w-5 h-5" />}
              {theme === "system" && <FaDesktop className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
