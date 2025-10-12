"use client";

import { Button } from "@/components/ui/button";
import CornerElements from "@/components/CornerElements";
import { useState } from "react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative z-10 pt-24 pb-32 container mx-auto px-4">
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-8 max-w-2xl mx-auto">
        <CornerElements />
        <h1 className="text-3xl font-bold font-mono mb-6 text-center">
          <span className="text-primary">Contact</span> Us
        </h1>

        {submitted ? (
          <p className="text-center text-muted-foreground mt-6">
            Thank you! Your message has been sent.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 border border-border rounded-md bg-background/50"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 border border-border rounded-md bg-background/50"
            />
            <textarea
              placeholder="Your Message"
              required
              className="w-full p-3 border border-border rounded-md bg-background/50 h-32"
            />
            <div className="text-center">
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Send Message
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactPage;
