import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  tasks: string[] = [];

  newTask: string = '';

  addTask() {

    if(!this.newTask.trim()) {
       this.newTask = '';
      return;
    }
    this.tasks.push(this.newTask);
    this.newTask = '';
  }

  removeTask(index: number){
    this.tasks.splice(index, 1);
  }
}
