import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/models/Task';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})

export class AddTodoComponent implements OnInit {

  @Output() editTask: EventEmitter<any> = new EventEmitter();

  task: Task = {
    createdOn: new Date(),
    id: "",
    text: "",
    priority: "",
    completed: false
  };
  currentTask: Task;
  editMode: boolean = true;

  constructor(private todoService: TodosService) {
    this.currentTask = {...this.task};
  }

  ngOnInit(): void {
    this.task.priority = "low";
    this.todoService.getEditMode().subscribe(data => {
      this.editMode = data.editMode;
      this.currentTask = data.currentTask;
    });
  }

  handleSubmit(){
    this.task.id = String(Math.floor(Math.random()*999999999));
    this.task.createdOn = new Date();
    this.todoService.addTask(this.task);
    this.task = {
      createdOn: new Date(),
      id: "",
      text: "",
      priority: "low",
      completed: false
    }
  }

  handleUpdate(){
    this.todoService.updateTask(this.currentTask)
    this.todoService.setEditMode("", false);
  }

  handleCancel(){
    this.todoService.setEditMode("", false);
  }

}
