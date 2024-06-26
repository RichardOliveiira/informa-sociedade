import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	
	constructor(private formBuilder: FormBuilder, private authService: AuthService) {}
	credentialsForm:any
	ngOnInit() {
		this.credentialsForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	onSubmit() {
		this.authService.login(this.credentialsForm.value).subscribe((res) => {
		})
	}

	register() {
		this.authService.register(this.credentialsForm.value).subscribe((res) => {
			this.authService.login(this.credentialsForm.value).subscribe();
		});
	}
}