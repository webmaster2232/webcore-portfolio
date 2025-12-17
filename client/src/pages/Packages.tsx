import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Packages() {
  const packages = [
    {
      name: "Basic",
      price: "$1,200",
      desc: "Ideal for businesses that need a simple, professional online presence.",
      features: [
        "Responsive website design",
        "Core business pages",
        "Mobile optimization",
        "Contact integration",
        "One round of revisions"
      ],
      highlight: false
    },
    {
      name: "Standard",
      price: "$3,500",
      desc: "Best for businesses looking to increase visibility and grow online.",
      features: [
        "Everything in Basic Package",
        "Additional strategic pages",
        "Local SEO setup",
        "Google Maps integration",
        "Social Media integration"
      ],
      highlight: true
    },
    {
      name: "Premium",
      price: "$6,000",
      desc: "Designed for businesses that want a fully customized and scalable website.",
      features: [
        "Fully custom design",
        "Advanced features & Logic",
        "Priority support",
        "Multiple rounds of revisions",
        "Blog / News section"
      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Transparent Pricing</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
             Our packages are designed to suit businesses at different stages. All pricing shown is a starting point and may vary depending on your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl border flex flex-col ${
                pkg.highlight 
                  ? "bg-primary/5 border-primary shadow-[0_0_30px_-10px_var(--color-primary)]" 
                  : "bg-card border-white/5"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name} Package</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-500">Starting at</span>
                  <span className="text-3xl font-bold text-white">{pkg.price}</span>
                  <span className="text-sm text-gray-400">TTD</span>
                </div>
                <p className="text-gray-400 text-sm mt-4">{pkg.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <Button 
                  className={`w-full ${
                    pkg.highlight 
                      ? "bg-primary text-background hover:bg-primary/90" 
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-card border border-white/5 rounded-2xl text-center">
          <p className="text-gray-400 text-sm">
            All projects require a <span className="text-white font-bold">25% upfront deposit</span> before work begins. <br/>
            Final pricing depends on features, content, and business requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
