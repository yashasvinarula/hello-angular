import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Task } from 'src/models/Task';
import { of } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  public editModeObservable: Observable<any>;
  public editModeSubject: BehaviorSubject<any>;
  public tasksObservable: Observable<any>;
  public tasksSubject: BehaviorSubject<any>;
  tasks: Task[] = [
    {
      createdOn: new Date(),
      id: "12",
      text: "sample task",
      priority: "low",
      completed: false
    },
    {
      createdOn: new Date(),
      id: "123",
      text: "sample task 1",
      priority: "high",
      completed: true
    },
    {
      createdOn: new Date(),
      id: "1234",
      text: "sample task 2",
      priority: "medium",
      completed: false
    },
  ];
  editMode: boolean = false;
  currentTask: Task = {
    createdOn: new Date(),
    id: "",
    text: "",
    priority: "low",
    completed: false
  }

  constructor() {
    this.editModeSubject = new BehaviorSubject({
      editMode: false,
      currentTask: null
    });
    this.editModeObservable = this.editModeSubject.asObservable();
    this.tasksSubject = new BehaviorSubject(this.tasks);
    this.tasksObservable = this.tasksSubject.asObservable();
  }

  getTasks(): Observable<Task[]>{
    return this.tasksObservable;
  }

  addTask(task: Task){
    this.tasks.push(task);
  }

  deleteTask(id: string){
    this.tasks = this.tasks.filter(task => task.id !== id);
    return of(this.tasks);
  }

  changeTaskStatus(id: string){
    this.tasks = this.tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
    return of(this.tasks);
  }

  setEditMode(id: string, editMode: boolean){
    this.editMode = editMode;
    if(editMode){
      this.currentTask = {...this.tasks.filter(task => task.id === id)[0]};
    }else{
      this.currentTask = {
        createdOn: new Date(),
        id: "",
        text: "",
        priority: "low",
        completed: false
      }
    }
    this.getEditMode();
  }

  getEditMode(){
    this.editModeSubject.next({
      editMode: this.editMode,
      currentTask: this.currentTask
    });
    return this.editModeObservable;
  }

  updateTask(updatedTask: Task){
    this.editMode = false;
    this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    this.tasksSubject.next(this.tasks);
    this.getTasks();
  }  

}
