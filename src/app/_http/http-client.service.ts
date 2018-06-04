import {Injectable} from '@angular/core';
import {Http, Headers, ResponseContentType} from '@angular/http';

@Injectable()
export class HttpClient {
	constructor(private http: Http){}

	public createAuthorizationHeader(headers: Headers)
	{
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('session_id'));
	}

	get(url:string){
		let headers = new Headers;
		this.createAuthorizationHeader(headers);
		return this.http.get(url,{headers});
	}

	delete(url:string){
		let headers = new Headers;
		this.createAuthorizationHeader(headers);
		return this.http.delete(url,{headers});
	}

	post(url:string,body = {}){
		let headers = new Headers;
		this.createAuthorizationHeader(headers);
		return this.http.post(url,body,{headers});
	}

	put(url:string,body = {}){
		let headers = new Headers;
		this.createAuthorizationHeader(headers);
		return this.http.put(url,body,{headers});
	}

	patch(url:string,body = {}){
		let headers = new Headers;
		this.createAuthorizationHeader(headers);
		return this.http.patch(url,body,{headers});
	}
}