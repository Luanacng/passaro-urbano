import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css']
})


export class OrdemCompraSucessoComponent implements OnInit {
  //importando um atributo de outro componente externo com o decorador Input
  @Input() public idPedidoCompra!: number

  constructor() { }

  ngOnInit(): void {
  }

}
