import { Link } from "wouter";
import logo from "@assets/image_1765994030517.png";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <a className="block mb-6 flex items-center gap-0">
                <span className="text-2xl font-bold font-display tracking-tight text-white">Webcore</span>
                <span className="text-2xl font-bold font-display tracking-tight text-primary">TT</span>
              </a>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional Web Design for Trinidad & Tobago Businesses. We build digital experiences that help you grow.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/webcore.tt/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about"><a className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</a></Link></li>
              <li><Link href="/portfolio"><a className="text-gray-400 hover:text-primary transition-colors text-sm">Our Work</a></Link></li>
              <li><Link href="/contact"><a className="text-gray-400 hover:text-primary transition-colors text-sm">Careers</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><Link href="/services"><a className="text-gray-400 hover:text-primary transition-colors text-sm">Web Design</a></Link></li>
              <li><Link href="/services"><a className="text-gray-400 hover:text-primary transition-colors text-sm">Development</a></Link></li>
              <li><Link href="/services"><a className="text-gray-400 hover:text-primary transition-colors text-sm">Maintenance</a></Link></li>
              <li><Link href="/packages"><a className="text-gray-400 hover:text-primary transition-colors text-sm">SEO Packages</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm">Trinidad & Tobago</li>
              <li><a href="mailto:webcorett@gmail.com" className="text-gray-400 hover:text-primary transition-colors text-sm">webcorett@gmail.com</a></li>
              <li><Link href="/contact"><a className="inline-block mt-2 text-primary font-medium hover:text-primary/80 text-sm">Book a Consultation →</a></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 Webcore. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
