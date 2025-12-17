import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Webcore</h1>
            <p className="text-xl text-gray-300">
              Webcore was created to help local businesses in Trinidad & Tobago build a professional online presence without the stress of managing technology.
            </p>
          </motion.div>

          <div className="prose prose-invert max-w-none">
            <div className="glass-panel p-8 rounded-2xl mb-12">
               <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
               <p className="text-gray-400 leading-relaxed">
                 We focus on clarity, reliability, and long-term support — delivering websites that not only look good but work effectively for your business. We believe that every local business deserves a world-class digital storefront.
               </p>
            </div>

            <h2 className="text-3xl font-bold text-white mb-8 text-center">Common Questions</h2>
            
            <div className="space-y-6">
              {[
                { q: "Do I need a monthly maintenance plan?", a: "No. Maintenance plans are optional but recommended if you want ongoing support and updates." },
                { q: "Can I update the website myself?", a: "We manage updates to ensure stability, security, and consistent quality." },
                { q: "How long does a website take to build?", a: "Timelines depend on project scope and how quickly content is provided." },
                { q: "Do you provide hosting and domain services?", a: "Yes, hosting and domain management can be provided or managed on your behalf." }
              ].map((faq, i) => (
                 <div key={i} className="border-b border-white/10 pb-6">
                   <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                   <p className="text-gray-400">{faq.a}</p>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
