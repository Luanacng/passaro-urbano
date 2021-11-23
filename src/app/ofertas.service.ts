import { Oferta } from "./shared/oferta.model"
import { HttpClient } from "@angular/common/http" //Serviço do Angular
import { Injectable } from "@angular/core"
import { URL_API } from "./app.api"
import { Observable } from "rxjs"
import { map, retry } from 'rxjs/operators'

//Decorando a classe OfertaService com Injectable fazendo ele ter acesso ao Serviço HttpClient
//Injetando um Serviço dentro de outro Serviço

@Injectable()
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: HttpClient){}

    public getOfertas(): Promise<Array<Oferta>> {
        //efetuar uma requisicao http 
        //retornar uma promise contendo um array de ofertas
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta)
    }

    public getOfertarPorCategoria(categoria: string): Promise<Array<Oferta>>{
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta)     
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta[0] //extrai a resposta como um objeto
            })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta[0].descricao
            })
    }

    public getOndeFicaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta[0].descricao
            })
    }

    //Observavel
    public pesquisaOfertas(termo: string): Observable<Array<Oferta>>{
        return this.http
        .get<Array<Oferta>>(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        .pipe(retry(10))    
        .pipe(map((resposta) => resposta)) //transformando a resposta em json
        
    }



    // public getOfertas2(): Promise<Array<Oferta>> {
    //     return new Promise((resolve, reject) => {
    //         // algum tipo de processamento que ao finalizar chama a funcao resolve ou reject
    //         let deucerto = true
    //         if(deucerto){
    //             setTimeout(() => {
    //                 resolve(this.ofertas)    
    //             }, 3000);

    //         } else { //tratando o erro
    //             reject({ codigo_erro: 404, mensagem_erro: 'servidor nao encontrado XYZ'})
    //         }
    //     })
    //     .then(( ofertas: any ) => {
    //         // fazer alguma tratativa
    //         console.log('primeiro then');
    //         return ofertas 
    //     })
    //     .then ((ofertas: any) => {
    //         console.log('segundo then');
    //         return new Promise((resolve2, reject2) => {
    //             setTimeout(() => {
    //                 resolve2( ofertas )
    //             }, 3000);
    //         })
    //     })
    //     .then (( ofertas: any ) => {
    //         console.log('terceiro then executado apos 3s pq tava aguardando uma promise ser resolvida');
    //         return ofertas
    //     })

    // }

}