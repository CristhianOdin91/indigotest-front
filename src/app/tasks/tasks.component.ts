import { Component, OnInit } from '@angular/core';

import { TasksService } from './tasks.service';

import { Task } from './task.dto';
import { DefaultResponse } from '../shared/default-response.dto';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit{
	public tasks:Task[];
	public searchQuery:string = '';

	public disableNewTask:boolean = true;

	constructor(private tasksService:TasksService){
		this.tasksService.getControls().subscribe(value => {
			if(this.searchQuery)
				this.search();
			else
				this.refreshTasks();
		});
	}

	public refreshTasks(){
		this.tasksService.fetchTasks()
					     .subscribe((response:DefaultResponse) => {
					     	this.tasks = response.tasks;
					     	this.disableNewTask = false;
					     });
	}

	public newTask(){
		this.tasks.push(new Task);
		this.disableNewTask = true;
	}

	public search(){
		if(this.searchQuery)
			this.tasksService.searchTask(this.searchQuery).subscribe((response:DefaultResponse) => this.tasks = response.tasks);
		else
			this.refreshTasks();
	}

	ngOnInit(){}
}