export type TaskStatus = 'Pending' | 'InProgress' | 'Completed';

export interface TaskItem {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;       // ISO
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string | null;
  dueDate: string; // ISO
}