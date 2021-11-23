import { Pedido } from "./shared/pedido.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { URL_API } from "./app.api";
import { map } from "rxjs/operators";
import { HttpHeaders,HttpRequest } from "@angular/common/http";


@Injectable()
export class OrdemCompraService {

    constructor(private htpp: HttpClient){
    }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        
        let headers: HttpHeaders = new HttpHeaders()

        //opcao de cabecalho escolhido
        headers.append('Content-type', 'application/json')
        
        return this.htpp.post(
            `${URL_API}/pedidos`,
            pedido,
            { headers: headers } //cabecalhos pra saber tratar corretamente
        )
        .pipe(map((resposta: any) => { return resposta.id })) //recuperando o conteudo do response http e transformando-o em json
    }
}