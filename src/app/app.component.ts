import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TaskItem, TaskStatus } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <h1>Task Manager</h1>

    <form [formGroup]="form" (ngSubmit)="add()">
      <input placeholder="Title" formControlName="title" />
      <input type="date" formControlName="dueDate" />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li *ngFor="let t of tasks(); trackBy: trackById">
        {{t.title}} — {{t.status}}
        <button (click)="remove(t)">Delete</button>
      </li>
    </ul>
  `
})
export class AppComponent {
  tasks = signal<TaskItem[]>([]);
  statuses: TaskStatus[] = ['Pending', 'InProgress', 'Completed'];

 form!: ReturnType<FormBuilder['group']>;

 constructor(private fb: FormBuilder, private api: TaskService) {
  this.form = this.fb.group({
    title: ['', Validators.required],
    dueDate: ['', Validators.required],
  });
}

  load() {
    this.api.getAll().subscribe((data: TaskItem[]) => this.tasks.set(data));
  }

  add() {
    if (this.form.invalid) return;
    const dto = {
      title: this.form.value.title!,
      dueDate: new Date(this.form.value.dueDate!).toISOString()
    };
    this.api.create(dto).subscribe((created: TaskItem) => {
    this.tasks.update(list => [created, ...list]);
    this.form.reset();
});
  }

  remove(t: TaskItem) {
    this.api.delete(t.id).subscribe(() => {
      this.tasks.update(list => list.filter(x => x.id !== t.id));
    });
  }

  trackById = (_: number, t: TaskItem) => t.id;
}