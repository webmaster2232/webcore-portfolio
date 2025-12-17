import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project } from '@shared/schema';
import projectsData from '../data/projects.json';

// We import the data directly from the JSON file
const PROJECTS_DATA = projectsData as unknown as Project[];

export type { Project };

// Replaced API calls with direct data import
async function fetchProjects(): Promise<Project[]> {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 300));
  return PROJECTS_DATA;
}

// These functions are kept to satisfy the interface but won't persist data to a server
async function createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  console.log("Adding project (session only):", project);
  return {
    ...project,
    id: Math.random(),
    createdAt: new Date()
  };
}

async function deleteProject(id: number): Promise<void> {
  console.log("Deleting project (session only):", id);
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
      // In a real app, this would refetch. Here we'd need to update local state if we wanted it to show up.
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
