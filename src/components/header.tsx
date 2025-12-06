'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/favicon-32x32.png"
            alt="Adol's Blog Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
            priority
          />
          <span className="hidden font-bold sm:inline-block">
            Adol&apos;s Blog
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href="/blog">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side - Theme + Mobile Menu */}
        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <SheetHeader className="space-y-3">
                <SheetTitle className="flex items-center space-x-2 text-left">
                  <Image
                    src="/favicon-32x32.png"
                    alt="Adol's Blog Logo"
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full"
                  />
                  <span>Adol&apos;s Blog</span>
                </SheetTitle>
                <SheetDescription className="text-left">
                  Navigate through the blog sections
                </SheetDescription>
              </SheetHeader>
              <div className="mx-4">
                <nav className="flex flex-col space-y-6">
                  <Link
                    href="/"
                    className="flex items-center text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className="flex items-center text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
