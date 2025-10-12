import Link from "next/link";
import CornerElements from "./CornerElements";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const NoFitnessPlan = () => {
  return (
    <div className="relative bg-background/40 backdrop-blur-md border border-border/50 rounded-2xl p-10 text-center shadow-lg overflow-hidden">
      {/* Decorative corner elements */}
      <CornerElements />

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
        <span className="text-primary">No</span> fitness plans yet
      </h2>

      {/* Description */}
      <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
        Start by creating a personalized fitness and diet plan tailored to your specific goals and
        needs.
      </p>

      {/* CTA Button */}
      <Button
        size="lg"
        asChild
        className="relative overflow-hidden bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl hover:bg-primary/100 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <Link href="/plan">
          <span className="flex items-center justify-center gap-2 relative">
            Create Your First Plan
            <ArrowRightIcon className="h-5 w-5 text-primary-foreground" />
          </span>
        </Link>
        
      </Button>

      {/* Optional subtle glow animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-2xl animate-pulse" />
      </div>
    </div>
  );
};

export default NoFitnessPlan;
