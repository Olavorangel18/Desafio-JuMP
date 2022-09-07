import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Output() fecharModalEmitter: EventEmitter<any> = new EventEmitter();
  @Output() rastrearInputEmitter: EventEmitter<any> = new EventEmitter();
  @Output() enviarFormularioInputEmitter: EventEmitter<any> = new EventEmitter();
  @Output() consultarUnidadeInputEmitter: EventEmitter<any> = new EventEmitter();
  @Input() modalTitle:string = "";
  @Input() inputLeitura:boolean = true;
  @Input() mostrarImagem:boolean = false;
  @Input() inputLeituraContent:string = "";
  @Input() labelTitle:String = "";
  @Input() html:any;
  @Input() mostrarInformacaoPedido: boolean = false;
  @Input() inputsPedido: any;
  @Input() incluirProcesso:boolean = false
  @Input() inputValue:string = "";
  @Input() carregamentoInformacao:boolean = false;
  

  fecharModal(){
    this.fecharModalEmitter.emit();
  }

  rastrearInput(event:any){
    this.rastrearInputEmitter.emit(event);
  }

  enviarFormulario(event:any){
    this.enviarFormularioInputEmitter.emit(event);
  }

  consultarUnidade(){
    this.consultarUnidadeInputEmitter.emit();
  }

  ngOnInit(): void {
  }

}
