import { ZapIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const links = [
    { href: "/about", label: "About" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/help", label: "Help" },
  ];

  return (
    <footer className="relative border-t border-border bg-background/80 backdrop-blur-md">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <ZapIcon className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <span className="text-2xl font-bold font-mono tracking-tight">
           Sm<span className="text-primary">ar</span>t<span className="text-primary">Fit</span>.ai
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              © {new Date().getFullYear()} SmartFit.ai - All rights reserved
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-2 text-sm text-muted-foreground">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background/40 backdrop-blur-sm shadow-inner">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              SYSTEM OPERATIONAL
            </span>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;
