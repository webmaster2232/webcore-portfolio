import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Lock, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import logo from "@assets/image_1765994030517.png";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Khaelon868") {
      setIsAdmin(true);
      setIsLoginOpen(false);
      toast({
        title: "Welcome back, Owner",
        description: "You now have access to manage the portfolio.",
      });
      // Save admin state to session storage so it persists on reload for this session
      sessionStorage.setItem("webcore_admin", "true");
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Incorrect password.",
      });
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("webcore_admin");
    toast({
      title: "Logged Out",
      description: "Admin mode disabled.",
    });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Packages", href: "/packages" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="flex items-center gap-0">
                <span className="text-2xl font-bold font-display tracking-tight text-white">Webcore</span>
                <span className="text-2xl font-bold font-display tracking-tight text-primary">TT</span>
              </a>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location === link.href
                        ? "text-primary bg-primary/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            
            {isAdmin ? (
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout Owner">
                <LogOut className="h-5 w-5 text-red-400" />
              </Button>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
                    <Lock className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-card border-white/10">
                  <DialogHeader>
                    <DialogTitle>Owner Access</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50 border-white/10"
                    />
                    <Button type="submit" className="w-full">
                      Unlock
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </a>
              </Link>
            ))}
             <div className="pt-4 flex items-center justify-between px-3">
                {isAdmin ? (
                   <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full">
                     Logout Owner
                   </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => {setIsOpen(false); setIsLoginOpen(true)}} className="w-full border-white/10 text-gray-400">
                    Owner Login
                  </Button>
                )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
}
