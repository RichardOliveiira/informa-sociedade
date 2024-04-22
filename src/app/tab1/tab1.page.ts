import { Component } from '@angular/core';
import { AvisosService } from '../services/avisos.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private avisosServices: AvisosService, private helper: JwtHelperService) { }
  avisos: any
  TOKEN_KEY = 'access_token'
  user: any = ""
  token: any = ""

  ngOnInit() {
    this.token = localStorage.getItem(this.TOKEN_KEY);
    this.user = this.helper.decodeToken(this.token);
    this.listarAvisos()


  }

  
  ionViewDidEnter() {
    this.listarAvisos();
  }

  listarAvisos(){
    this.avisosServices.pegarTodosAvisos().subscribe({
      next: (resp) => {
        this.avisos = resp

      },
      error: (error) => {
        console.error('Erro na solicitação HTTP:', error);
      }
    });
  }
}

