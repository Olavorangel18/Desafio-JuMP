import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-identificacao-pagina',
  templateUrl: './identificacao-pagina.component.html',
  styleUrls: ['./identificacao-pagina.component.scss']
})
export class IdentificacaoPaginaComponent implements OnInit, AfterContentChecked {
  
  @Input() nomePagina: string | undefined;

  constructor() {

  }
 
  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    console.log(this.nomePagina)
  }



}
