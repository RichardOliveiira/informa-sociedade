import { Component } from '@angular/core';
import { AvisosService } from '../services/avisos.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private avisosServices: AvisosService, private helper: JwtHelperService, private alertController: AlertController) {}
  descricao: string = "";
  titulo: string = "";
  TOKEN_KEY = 'access_token'
  user: any = ""
  token: any = ""

  ngOnInit() {
    this.token = localStorage.getItem(this.TOKEN_KEY);
    this.user = this.helper.decodeToken(this.token);
  }

  cadastrarAviso(){
    this.avisosServices.cadastarAviso({titulo: this.titulo, descricao: this.descricao}).subscribe({
      next: (resp:any) => {
        this.showAlert(resp.msg, "Aviso");
        this.descricao = "";
        this.titulo = "";
      },
      error: (error) => {
        this.showAlert('Erro ao criar cadastro, por favor tenta mais tarde!', "Erro");
        console.error('Erro na solicitação HTTP:', error);
      },
    });
  }

  showAlert(msg:any, header: string) {
		let alert = this.alertController.create({
			message: msg,
			header: header,
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}

}
