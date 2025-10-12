"use client";

import CornerElements from "@/components/CornerElements";

const TermsPage = () => {
  return (
    <section className="relative z-10 pt-24 pb-32 container mx-auto px-4">
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-8">
        <CornerElements />
        <h1 className="text-3xl font-bold font-mono mb-6">
          <span className="text-primary">Terms</span> of Service
        </h1>
        <p className="text-muted-foreground mb-4">
          Welcome to CodeFlex.ai! By accessing or using our services, you agree to be bound by these Terms of Service.
        </p>
        <p className="text-muted-foreground mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
        <p className="text-muted-foreground">
          Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
        </p>
      </div>
    </section>
  );
};

export default TermsPage;
