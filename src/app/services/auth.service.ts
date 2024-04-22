import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'access_token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	url = "http://localhost:3030"
	user = null;
	authenticationState = new BehaviorSubject(false);

	constructor(
		private http: HttpClient,
		private helper: JwtHelperService,
		private plt: Platform,
		private alertController: AlertController
	) {
		this.plt.ready().then(() => {
			this.checkToken();
		});
	}

	checkToken() {
	let token =	localStorage.getItem(TOKEN_KEY);
			if (token) {
				let decoded = this.helper.decodeToken(token);
				let isExpired = this.helper.isTokenExpired(token);

				if (!isExpired) {
					this.user = decoded;
					this.authenticationState.next(true);
				} else {
					localStorage.removeItem(TOKEN_KEY);
				}
			}
		}
	

	register(credentials:any) {
		return this.http.post(`${this.url}/users/register`, credentials).pipe(
			catchError((e) => {
				this.showAlert(e.error.msg);
				throw new Error(e);
			})
		);
	}

	login(credentials:any) {
		return this.http.post(`${this.url}/users/login`, credentials).pipe(
			tap((res:any) => {
				localStorage.setItem(TOKEN_KEY, res['token']);
				this.user = this.helper.decodeToken(res['token']);
				this.authenticationState.next(true);
			}),
			catchError((e) => {
				this.showAlert(e.error.msg);
				throw new Error(e);
			})
		);
	}

	logout() {
		localStorage.removeItem(TOKEN_KEY)
			this.authenticationState.next(false);
	}

	isAuthenticated() {
		return this.authenticationState.value;
	}

	showAlert(msg:any) {
		let alert = this.alertController.create({
			message: msg,
			header: 'Erro',
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}
}