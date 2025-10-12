"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-primary/10 rounded-lg transition-transform duration-200 group-hover:scale-110">
            <ZapIcon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight font-mono">
            code<span className="text-primary">flex</span>.ai
          </span>
        </Link>

       
        <nav className="hidden md:flex items-center gap-6">
          {isSignedIn ? (
            <>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <HomeIcon size={16} />
                Home
              </Link>

              <Link
                href="/generate-program"
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <DumbbellIcon size={16} />
                Generate
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <UserIcon size={16} />
                Profile
              </Link>

              <Button
                asChild
                variant="outline"
                className="ml-2 border-primary/40 text-primary hover:text-white hover:bg-primary transition-colors"
              >
                <Link href="/generate-program">Get Started</Link>
              </Button>

              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-white hover:bg-primary/20 transition-colors"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          {isSignedIn ? <UserButton /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
