import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/Tasks';

  constructor() { }

  async getTasks(): Promise<any> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
      }
      let data = await response.json();
        console.log(data)
      data = data.map((el: Task) => el.completed === 'done' ? {...el ,completed: true } : {...el,completed:false})
    
      return data
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async addTask(task: Task): Promise<Task> {
    task.completed === true ? task.completed = 'done' : task.completed = 'pending';
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      if (!response.ok) {
        throw new Error(`Failed to add task: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/:${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async updateTask(task: Task): Promise<Task> {
    try {
      const response = await fetch(`${this.apiUrl}/Edit/:${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }
}
