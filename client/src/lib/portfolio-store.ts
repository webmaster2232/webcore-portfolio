import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project } from '@shared/schema';

// Mock data since we are frontend-only
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "5AM Club Coffee",
    category: "E-Commerce",
    description: "A modern e-commerce platform for a premium coffee brand featuring subscription management and seamless checkout.",
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000",
    link: "https://example.com",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "TechFlow Solutions",
    category: "Corporate",
    description: "Corporate website redesign for a leading IT consultancy firm with service catalog and case studies.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    link: "https://example.com",
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Urban Architecture",
    category: "Portfolio",
    description: "Minimalist portfolio for an architecture studio showcasing high-res imagery and project galleries.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    link: "https://example.com",
    createdAt: new Date()
  }
];

export type { Project };

// Replaced API calls with Mock Data functions
async function fetchProjects(): Promise<Project[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_PROJECTS;
}

async function createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  // In a real app, this would POST to a server.
  // Here, we just return the data to simulate success.
  console.log("Mock creating project:", project);
  return {
    ...project,
    id: Math.random(),
    createdAt: new Date()
  };
}

async function deleteProject(id: number): Promise<void> {
  console.log("Mock deleting project:", id);
}

export function usePortfolio() {
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const addProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects,
    isLoading,
    addProject: addProjectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
  };
}
