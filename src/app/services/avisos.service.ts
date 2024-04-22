import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3030"


  pegarTodosAvisos(){
    return this.http.get(this.url+"/avisos/todos")
  }
  cadastarAviso(aviso:any){
    return this.http.post(this.url+"/avisos/cadastro", {aviso})
  }
}
