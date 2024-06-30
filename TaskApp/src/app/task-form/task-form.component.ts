import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = {
    id: 0,
    title: '',
    completed: false
  };

  constructor(private taskService: TaskService) { }

  async addTask(): Promise<void> {
    if (!this.task.title) return;
    try {
    await this.taskService.addTask(this.task);
    this.task  = {
    id: 0,
    title: '',
    completed: false
  };
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }
}