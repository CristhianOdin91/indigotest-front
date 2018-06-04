import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

/* NG Bootstrap */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';

import { SessionService } from './session/session.service';
import { TasksService } from './tasks/tasks.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    TasksModule
  ],
  providers: [
  	SessionService,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
