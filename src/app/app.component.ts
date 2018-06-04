import { Component, OnInit } from '@angular/core';

import { SessionService } from './session/session.service';
import { TasksService } from './tasks/tasks.service';

import { Session } from './session/session.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private sessionService:SessionService,
    private tasksService:TasksService
  ){}

  public checkSessionId(){
  	if(!localStorage.getItem('session_id'))
    {
  		this.sessionService.sessionInit()
                         .subscribe((session:Session) => {
                           localStorage.setItem('session_id',session.session_id);
                           this.tasksService.makeRefresh();
                         });
    }
    else
      this.tasksService.makeRefresh();
  }

  ngOnInit(){
  	this.checkSessionId();
  }
}
