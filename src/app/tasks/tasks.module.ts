import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TasksComponent } from './tasks.component';
import { TaskComponent } from './task/task.component';

import { HttpClient } from '../_http/http-client.service';
import { TasksService } from './tasks.service';

@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		HttpModule,
		NgbModule
	],
	declarations: [
		TasksComponent,
		TaskComponent
	],
	providers: [
		HttpClient,
		TasksService
	],
	exports: [
		TasksComponent
	],
	bootstrap: [TasksComponent]
})

export class TasksModule{}