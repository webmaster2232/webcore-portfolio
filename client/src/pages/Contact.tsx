import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const encode = (data: any) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const onSubmit = (data: any) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...data }),
    })
      .then(() => {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. We will get back to you shortly.",
        });
        reset();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-gray-400 text-lg mb-10">
              Tell us about your business and what you’re looking to build. We’ll get back to you with next steps.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <a href="mailto:webcorett@gmail.com" className="text-gray-400 hover:text-primary transition-colors">webcorett@gmail.com</a>
                </div>
              </div>
              
               <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Location</h3>
                  <span className="text-gray-400">Trinidad & Tobago</span>
                </div>
              </div>
            </div>

             <div className="mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20">
               <h3 className="text-white font-bold mb-2">Ready to start?</h3>
               <p className="text-gray-400 text-sm mb-4">
                 We typically respond to inquiries within 24 hours.
               </p>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-white/5 p-8 rounded-3xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-netlify="true" name="contact">
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">First Name</Label>
                  <Input {...register("firstName")} className="bg-background/50 border-white/10" placeholder="John" name="firstName" />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Last Name</Label>
                  <Input {...register("lastName")} className="bg-background/50 border-white/10" placeholder="Doe" name="lastName" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input {...register("email", { required: true })} type="email" className="bg-background/50 border-white/10" placeholder="john@company.com" name="email" />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Service Interested In</Label>
                <select {...register("service")} className="w-full h-10 px-3 rounded-md bg-background/50 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" name="service">
                  <option value="basic">Basic Website</option>
                  <option value="standard">Standard Package</option>
                  <option value="premium">Premium Custom</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Message</Label>
                <Textarea {...register("message", { required: true })} className="bg-background/50 border-white/10 min-h-[150px]" placeholder="Tell us about your project..." name="message" />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary text-background font-bold hover:bg-primary/90">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
