import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  TOKEN_KEY = 'access_token';
  user: any = ""

  constructor(private helper: JwtHelperService){}

  ngOnInit() {
   let token = localStorage.getItem(this.TOKEN_KEY) || "";
  this.user = this.helper.decodeToken(token);
  }
}
