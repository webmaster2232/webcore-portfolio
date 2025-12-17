import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Globe, Layout, Shield, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrambleText } from "@/components/ui/scramble-text";
import { CountUp } from "@/components/ui/count-up";
import heroBg from "@assets/generated_images/abstract_digital_technology_waves_background_dark_blue.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Professional Web Design in T&T 🇹🇹
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Build Your Business <br />
              <span className="text-gradient">
                <ScrambleText text="Online Presence" speed={50} />
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              We design and manage modern, mobile-friendly websites that help your business get found, build trust, and grow online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-background font-semibold">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/packages">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-white/20 hover:bg-white/10 text-white">
                  View Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/2 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Businesses Impacted", value: 100, suffix: "+" },
              { label: "Websites Launched", value: 85, suffix: "+" },
              { label: "Client Satisfaction", value: 100, suffix: "%" },
              { label: "Support Available", value: 24, suffix: "/7" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Webcore helps local businesses establish a strong online presence through clean design, smart structure, and reliable website management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layout className="h-10 w-10 text-primary" />,
                title: "Custom Design",
                desc: "Clean, professional designs tailored to your brand identity."
              },
              {
                icon: <Smartphone className="h-10 w-10 text-primary" />,
                title: "Mobile Optimized",
                desc: "Websites that look and work perfectly on every device."
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Fully Managed",
                desc: "We handle the technical updates, security, and hosting."
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-all"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-xl w-fit">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-left" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Why Your Business <br/>
                <span className="text-primary">Needs a Website</span>
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300 text-lg">
                  Today, customers expect to find businesses online. Without a website, you lose credibility and potential customers to competitors.
                </p>
                <ul className="space-y-4">
                  {[
                    "Appears less credible than competitors",
                    "Is harder to find on Google",
                    "Loses customers outside of business hours",
                    "Misses opportunities every single day"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-red-500/10 p-1 rounded-full">
                         <div className="h-2 w-2 rounded-full bg-red-500" />
                      </div>
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="glass-panel p-8 rounded-2xl border-primary/20">
              <h3 className="text-2xl font-bold text-white mb-6">With Webcore You Get:</h3>
              <ul className="space-y-4">
                {[
                  "Mobile-optimized for phones and tablets",
                  "Built for local search visibility",
                  "Clean, professional design",
                  "Managed and stress-free",
                  "Designed with Trinidad & Tobago businesses in mind"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="w-full mt-8 bg-white text-background hover:bg-gray-200">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to grow your business online?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Request a quote today and let’s get started.
          </p>
          <Link href="/contact">
            <Button size="lg" className="text-lg px-12 py-6 rounded-full bg-primary hover:bg-primary/90 text-background font-bold shadow-[0_0_40px_-10px_var(--color-primary)]">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
