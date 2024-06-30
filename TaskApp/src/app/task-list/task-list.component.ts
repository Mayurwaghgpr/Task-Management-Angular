import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';
interface mode { item: string; mode: boolean}
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editmode:mode = {
    item: '',
    mode:true
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  async getTasks(): Promise<void> {
    try {
      this.tasks = await this.taskService.getTasks();
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }

  async deleteTask(id: string): Promise<void> {
    console.log(id)
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

  toggleEditMode(t: string): void {
    this.editmode.item=t
    this.editmode.mode = !this.editmode.mode;
  }

  async saveTask(task: Task): Promise<void> {
    try {
      await this.taskService.updateTask(task);
      this.editmode.item=''
      this.editmode.mode = false;
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  }
}
