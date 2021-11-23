import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertaService: OfertasService) { }

  ngOnInit(): void {
    //combinando um observable com a promise para recuperar o id atualizado da rota do componente pai
    this.route.parent?.params.subscribe((parametros: Params) => {
      this.ofertaService.getComoUsarOfertaPorId(parametros.id)
      .then((descricao: string) => {
        this.comoUsar = descricao
      })
    })
  }

}
