import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem, CreateTaskDto, TaskStatus } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private base = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.base);
  }

  create(dto: CreateTaskDto): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.base, dto);
  }

  updateStatus(id: string, status: TaskStatus): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.base}/${id}/status`, { status });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}