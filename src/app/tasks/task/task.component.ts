import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { TasksService } from '../tasks.service';

import { Task } from '../task.dto';
import { DefaultResponse } from '../../shared/default-response.dto';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit, OnDestroy{
	@Input() task:Task;

	public editMode:boolean = false;

	constructor(private tasksService:TasksService){}

	public closeEdit(){
		this.tasksService.makeRefresh();
	}

	public handleResponse(response:DefaultResponse){
		this.tasksService.makeRefresh();
	}

	public enableEdit(){
		this.editMode = true;
	}

	public checkEditMode(){
		if(!this.task.id)
			this.enableEdit();
	}

	public sendTask(){
		this.tasksService.saveTask(this.task).subscribe((response:DefaultResponse) => this.handleResponse(response));
	}

	public eraseTask(){
		this.tasksService.deleteTask(this.task).subscribe((response:DefaultResponse) => this.handleResponse(response));
	}

	public checkTask(){
		this.tasksService.completeTask(this.task).subscribe((response:DefaultResponse) => this.handleResponse(response));
	}

	ngOnInit(){
		this.checkEditMode();
	}

	ngOnDestroy(){}
}