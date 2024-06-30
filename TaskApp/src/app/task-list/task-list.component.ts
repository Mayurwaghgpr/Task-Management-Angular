import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editmode: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    try {
      this.tasks = await this.taskService.getTasks();
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.taskService.deleteTask(id);
      this.tasks = this.tasks.filter(task => task.id !== id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }

  toggleComplete(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  toggleEditMode(): void {
    this.editmode = !this.editmode;
  }

  async saveTask(task: Task): Promise<void> {
    try {
      await this.taskService.updateTask(task);
      this.editmode = false;
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  }
}
