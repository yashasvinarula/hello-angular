import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { Task } from 'src/models/Task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() task: Task = {
      createdOn: new Date(),
      id: "",
      text: "",
      priority: "low",
      completed: false
  };
  constructor(private todoService:TodosService) {}

  @Output() changeTaskStatus: EventEmitter<string> = new EventEmitter();
  @Output() deleteTask: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
  }

  delete = (id:string) => {
    const response: boolean = window.confirm('Are you sure you want to delete this task?');
    if(response){
      this.deleteTask.emit(id);
    }
  }

  enableEdit = (id:string, editMode: boolean) => {
    this.todoService.setEditMode(id, editMode);
  }

  changeStatus = (id:string) => {
    this.changeTaskStatus.emit(id);
  }


}
