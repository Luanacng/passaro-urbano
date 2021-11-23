import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Array<Oferta>>


  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    //controlando o observable atraves do subject
    this.ofertas = this.subjectPesquisa  //retorno do array de Ofertas
      .pipe(debounceTime(1000))          //executa a acao do switchmap apos 1s
      .pipe(distinctUntilChanged())      //para fazer pesquisas distintas
      .pipe(switchMap((termo: string) => {
               
        //elimina espaco em branco, deixando apenas o conteudo
        if(termo.trim() === ''){
          //retorna um observable de array de ofertas vazio, assim n retorna a base de dados inteira
          return of<Oferta[]>([])
        }
        //retornando o observable de array de ofertas
        return this.ofertasService.pesquisaOfertas(termo)
      }))
      .pipe(catchError((err: any) => {
        return of<Oferta[]>([])
      }))
      
  }

  public pesquisa(termoDaPesquisa: string): void{
    
    //passando os valores para o subject
    this.subjectPesquisa.next(termoDaPesquisa.trim())
  }

  public limpaPesquisa(): void {
    //passando um novo valor para o subject/observable
    this.subjectPesquisa.next('')
  }

}