import { OfertasService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})

export class HomeComponent implements OnInit {

  public ofertas!: Array<Oferta>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    //this.ofertas = this.ofertasService.getOfertas()
    //console.log(this.ofertas);

    this.ofertasService.getOfertas()
      .then(( ofertas: Array<Oferta> ) => { //cai no resolve da promise
        this.ofertas = ofertas
       })
       .catch((param: any) => { //cai no reject da promise
         //console.log(param);
       })
  }
  
  //Injecao de um Serviço dentro de um Componente
  //Tipo de de Escopos de injecao: de modulo, de componente/filhos e de componente 

}
