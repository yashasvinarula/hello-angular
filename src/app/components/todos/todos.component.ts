import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { Task } from 'src/models/Task';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  tasks: Task[] = [];
  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.todoService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  changeTaskStatus(id: string){
    this.todoService.changeTaskStatus(id).subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id:string){
    this.todoService.deleteTask(id).subscribe(tasks => this.tasks = tasks);
  }

}
