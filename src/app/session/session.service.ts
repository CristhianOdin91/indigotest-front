import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Session } from './session.dto';

import { environment } from '../../environments/environment';

@Injectable()

export class SessionService{
	private baseUrl:string = environment.api.base_url;
	private endpoints = environment.api.endpoints;

	constructor(private http:Http){}

	public sessionInit():Observable<Session>{
		return this.http.post(this.baseUrl+this.endpoints.session,{})
				.pipe(map(this.extractData),catchError(this.handleError));
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

		return Observable.throw(error);
	}
}