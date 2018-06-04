import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpClient } from '../_http/http-client.service';

import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { DefaultResponse } from '../shared/default-response.dto';
import { Task } from './task.dto';
import { TaskRequest } from './task-request.dto';

import { environment } from '../../environments/environment';

@Injectable()

export class TasksService{
	private taskRefreshSource = new Subject<boolean>();
	public taskRefreshObs = this.taskRefreshSource.asObservable();

	private baseUrl:string = environment.api.base_url;
	private endpoints = environment.api.endpoints;

	constructor(private http:HttpClient){}

	public fetchTasks():Observable<DefaultResponse>{
		return this.http.get(this.baseUrl+this.endpoints.task)
				   .pipe(map(this.extractData),catchError(this.handleError));
	}

	public saveTask(task:Task):Observable<DefaultResponse>{
		let httpAction;
		let body:TaskRequest = new TaskRequest;

		body.name = task.name;

		if(task.id)
			httpAction = this.http.put(`${this.baseUrl}${this.endpoints.task}/${task.id}`,body);
		else
			httpAction = this.http.post(`${this.baseUrl}${this.endpoints.task}`,body);

		return httpAction.pipe(map(this.extractData),catchError(this.handleError));
	}

	public deleteTask(task:Task):Observable<DefaultResponse>{
		return this.http.delete(`${this.baseUrl}${this.endpoints.task}/${task.id}`)
				   .pipe(map(this.extractData),catchError(this.handleError));
	}

	public completeTask(task:Task):Observable<DefaultResponse>{
		return this.http.patch(`${this.baseUrl}${this.endpoints.task}/${task.id}`)
				   .pipe(map(this.extractData),catchError(this.handleError));
	}

	public searchTask(taskName:string):Observable<DefaultResponse>{
		let body:TaskRequest = new TaskRequest;

		body.name = taskName;

		return this.http.post(this.baseUrl+this.endpoints.search_task,body)
				   .pipe(map(this.extractData),catchError(this.handleError));
	}

	public getControls():Observable<any>{
		return this.taskRefreshObs;
	}

	public makeRefresh(){
		this.taskRefreshSource.next(true);
	}

	private extractData( res: Response )
	{
		let body = res.json();
		return body || {};
	}

	private handleError( error: Response | any )
	{
		let errMsg: string;

		if( error instanceof Response )
		{
		  const body = error.json() || '';
		  const err = body.message || JSON.stringify(body);
		  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		}
		else
		  errMsg = error.message ? error.message : error.toString();

		console.error(errMsg);

		if(error.status == 403){
			localStorage.removeItem('session_id');
			location.reload();
		}

		return Observable.throw(error);
	}
}