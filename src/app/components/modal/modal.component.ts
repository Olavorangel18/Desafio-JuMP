import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  //Modal - Informações Gerais
  @Output() fecharModalEmitter: EventEmitter<any> = new EventEmitter();
  @Input() modalTitle:string = "";
  @Input() labelTitle:String = "";

  //Modal - Imagem/XML (Controls)
  @Input() mostrarImagem:boolean = false;
  @Input() htmlImagem:any;

  //Modal - Tempo/Processo (Controls)
  @Input() inputLeituraTempo:boolean = true;
  @Input() inputLeituraTempoContent:string = "";

  //Modal - Estatisticas/Processo (Controls)
  @Input() carregamentoInformacao:boolean = false;
  @Input() mostrarInformacaoPedido: boolean = false;

  //Modal - Formulário Processo Inclusão (Controls)
  @Output() rastrearInputEmitter: EventEmitter<any> = new EventEmitter();
  @Output() enviarFormularioInputEmitter: EventEmitter<any> = new EventEmitter();
  @Output() consultarUnidadeInputEmitter: EventEmitter<any> = new EventEmitter();
  @Input() incluirProcesso:boolean = false
  @Input() inputValue:string = "";
  @Input() inputsPedido: any;

  ngOnInit(): void {
  }

  //********************************************************
  //              Modal - Metodos Gerais
  //********************************************************

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

}
