import { motion } from "framer-motion";
import { Code, Globe, Lock, Palette } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Website Design & Development",
      description: "We design professional websites that clearly communicate your services, build credibility, and work seamlessly across all devices.",
      details: ["Responsive layouts", "Clear navigation", "Fast loading times", "Modern design standards"]
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Advanced Functionality",
      description: "For businesses that need more than a basic website, we offer advanced features tailored to your needs.",
      details: ["Booking systems", "Contact forms", "Google Maps", "Blog sections"]
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Website Management",
      description: "We offer managed website services so you don’t have to worry about technical upkeep.",
      details: ["Hosting & domain", "Security updates", "Backups", "Content changes"]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive web solutions tailored for Trinidad & Tobago businesses.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-gray-400">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
