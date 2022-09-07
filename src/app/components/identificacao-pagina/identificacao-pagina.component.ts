import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-identificacao-pagina',
  templateUrl: './identificacao-pagina.component.html',
  styleUrls: ['./identificacao-pagina.component.scss']
})
export class IdentificacaoPaginaComponent implements OnInit{
  
  @Input() nomePagina: string | undefined;
  @Output() abrirFormularioEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {

  }
 
  ngOnInit(): void {
  }

  abrirModal(){
    let modal:HTMLElement | null = document.querySelector('.modal')
    modal?.classList.add('modal-ativo');
    modal?.firstElementChild?.classList.add('h-200px');
    console.log("Oi")
  }




}
