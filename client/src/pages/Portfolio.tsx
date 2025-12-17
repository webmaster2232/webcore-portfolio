import { motion } from "framer-motion";
import { usePortfolio } from "@/lib/portfolio-store";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import stock1 from "@assets/generated_images/modern_coffee_shop_website_mockup_minimalist.png";
import stock2 from "@assets/generated_images/corporate_business_website_mockup_blue_theme.png";
import stock3 from "@assets/generated_images/creative_portfolio_website_mockup_colorful.png";

type ProjectForm = {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link?: string;
};

export default function Portfolio() {
  const { projects, isLoading, addProject, deleteProject } = usePortfolio();
  const isAdmin = sessionStorage.getItem("webcore_admin") === "true";
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<ProjectForm>();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2000000) { // 2MB limit for database storage
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please use an image under 2MB.",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setValue("imageUrl", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProjectForm) => {
    // If no image URL provided, pick a random stock one
    if (!data.imageUrl) {
      const stocks = [stock1, stock2, stock3];
      data.imageUrl = stocks[Math.floor(Math.random() * stocks.length)];
    }
    
    addProject(data as any, {
      onSuccess: () => {
        setIsAddOpen(false);
        reset();
        setPreviewImage(null);
        toast({
          title: "Project Added",
          description: "New portfolio item has been published.",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add project. Please try again.",
        });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id, {
        onSuccess: () => {
          toast({
            title: "Project Deleted",
            description: "Portfolio item removed.",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete project.",
          });
        }
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Recent Work</h1>
            <p className="text-gray-400 max-w-xl">
              A selection of projects we've built for businesses across Trinidad & Tobago.
            </p>
          </div>
          
          {isAdmin && (
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-background hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-white/10 text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input {...register("title", { required: true })} className="bg-background/50 border-white/10" placeholder="e.g. 5AM Club Coffee" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input {...register("category", { required: true })} className="bg-background/50 border-white/10" placeholder="e.g. E-Commerce" />
                  </div>
                  <div className="space-y-2">
                    <Label>Live Link (Optional)</Label>
                    <Input {...register("link")} className="bg-background/50 border-white/10" placeholder="https://..." />
                  </div>
                   <div className="space-y-2">
                    <Label>Project Image</Label>
                    <div className="flex gap-2 items-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-white/10 text-gray-400"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="mr-2 h-4 w-4" /> Upload Cover
                      </Button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/png, image/jpeg" 
                        onChange={handleImageUpload}
                      />
                      <span className="text-xs text-gray-500">PNG/JPG under 2MB</span>
                    </div>
                    {previewImage && (
                      <div className="mt-2 relative aspect-video w-full overflow-hidden rounded-md border border-white/10">
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <Input type="hidden" {...register("imageUrl")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea {...register("description", { required: true })} className="bg-background/50 border-white/10" placeholder="Short description..." />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-background">
                    Publish Project
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No projects found. {isAdmin && "Add one above!"}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden bg-gray-900 relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="secondary" className="rounded-full">
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                     <span className="text-primary text-xs font-bold uppercase tracking-wider">{project.category}</span>
                     <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
                  </div>
                  {isAdmin && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-8 w-8"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
