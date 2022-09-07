import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Processo } from 'src/app/models/processo.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tabelaColuna: string[] | undefined;
  @Input() tabelaItemList: Processo[] | undefined;

  @Output() abrirModalEmitter: EventEmitter<any> = new EventEmitter()
  @Output() abrirModalImagemEmitter: EventEmitter<any> = new EventEmitter();
  @Output() abrirModalInformacaoEmitter: EventEmitter<any> = new EventEmitter()



  constructor() { }

  ngOnInit(): void {
  }

  abrirModal(event:any){
    this.abrirModalEmitter.emit(event);
  }

  abrirModalImagem(event:any){
    this.abrirModalImagemEmitter.emit(event);
  }

  abrirModalInformacao(event:any){
    this.abrirModalInformacaoEmitter.emit(event);
  }
}
