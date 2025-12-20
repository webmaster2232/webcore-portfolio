import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Project, InsertProject } from '@shared/schema';

export type { Project };

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

async function createProject(project: InsertProject): Promise<Project> {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
}

async function deleteProject(id: number): Promise<void> {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
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
    addProject: (data: InsertProject, options?: { onSuccess?: () => void; onError?: () => void }) => {
      addProjectMutation.mutate(data, {
        onSuccess: options?.onSuccess,
        onError: options?.onError,
      });
    },
    deleteProject: (id: number, options?: { onSuccess?: () => void; onError?: () => void }) => {
      deleteProjectMutation.mutate(id, {
        onSuccess: options?.onSuccess,
        onError: options?.onError,
      });
    },
  };
}
