import { OfertasService } from './../ofertas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
//import { interval, Observable, Observer, Subscription } from 'rxjs';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private tempoObservableSubscription!: Subscription
  // private meuObservableTesteSubscription!: Subscription

  public oferta!: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {

    //combinando subscribe com observable, encaminhando o id atualizado da rota
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta        
      }) 
    })   

    //metodo subscribe permite enviar uma funcao de callback
    //o angular fica assistindo qualquer mudanca da rota
    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro.id);
      
    // })

    // let tempo = interval(2000)
    // this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
    //   console.log(intervalo);
    // })

    // //Observable(observavel)
    //   let meuObservableTeste = new Observable((observer: Observer<number>) => {
    //    observer.next(1) 
    //    observer.next(2) 
    //    observer.complete()
    //    observer.next(3) 
    //   })


    // //Observable(observador)
    //  this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //     (resultado: number) => console.log(resultado+10),
    //     (erro: string) => console.log(erro),
    //     () => console.log('stream foi finalizada')
    //   )

  }

  ngOnDestroy(){
    // this.meuObservableTesteSubscription.unsubscribe()
    // this.tempoObservableSubscription.unsubscribe()
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens());
    
  }

}
