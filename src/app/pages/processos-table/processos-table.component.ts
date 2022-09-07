import { Component, OnInit } from '@angular/core';
import { Movimento } from 'src/app/models/movimento.model';
import { Processo } from 'src/app/models/processo.model';
import { ProcessoServiceService } from 'src/app/services/processo-service/processo-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Unidade } from 'src/app/models/unidade.model';
import { Input } from 'src/app/models/input.model';
import { xml2json } from 'xml-js';


@Component({
  selector: 'app-processos-table',
  templateUrl: './processos-table.component.html',
  styleUrls: ['./processos-table.component.scss']
})
export class ProcessosTableComponent implements OnInit {

  constructor(
    private service: ProcessoServiceService,
    private sanitizer:DomSanitizer
  ) {}
  
  //Tabela - Informações de Exibição
  tabelaColuna: string[] = ['Processo', 'Conclusão', "",'Petição', "", 'Desistência',"",'Expedição'];
  tabelaItemList: Processo[] = [];
  unidade: Unidade | undefined;

  //Documento - Tradução de Informações XML/JSON
  json: string | object = {};
  xml: XMLDocument | string = "";
  responseXML:SafeHtml | string | undefined;
  processoXML: SafeHtml | undefined;

  //Modal - Informações de Exibição
  modalTitle: string | undefined;
  modalLabelTitle: string | undefined;
  mostrarXMLModal: boolean = false;
  mostrarInformacoesPedidoModal: boolean = false;
  inputLeituraTempoContentModal: string | undefined;
  inputLeituraTempoModal: boolean = false;
  carregamentoInformacao:boolean = false;
  inputsInformacaoPedido: Input[] = [];
  
  //Formulario - Modal (Incluir Processo)
  processo: Processo|undefined;
  inputValue: string = "7065";

  ngOnInit(): void {
    this.recuperarImagemProcesso();
  }

  //********************************************************
  //              Pegar Imagem do Processo
  //********************************************************

    recuperarImagemProcesso(){
      this.carregamentoInformacao = true;
      this.service.getImagem()
          .subscribe(
              response => {
              },
              responseError => {    
                this.transformarXMLParaJSON(responseError.error.text)
                this.formatarProcessoJSON(JSON.parse(String(this.json)));
                this.carregamentoInformacao = false;
              }
          );
    }
  
    consultarUnidadeModal(){
      this.carregamentoInformacao = true;
      if(this.inputValue){
        this.service.getImagemConsulta(this.inputValue)
          .subscribe(
              response => {
              },
              responseError => {    
                this.transformarXMLParaJSON(responseError.error.text)
                this.formatarProcessoJSON(JSON.parse(String(this.json)));
                this.carregamentoInformacao = false;
              }
          );
      }
    }

  //********************************************************
  //           Recuperar Informações do Processo
  //********************************************************

    recuperarInformacoesProcesso(unidade:Unidade){
      this.carregamentoInformacao = true;
      this.mostrarInformacoesPedidoModal = true;
      this.service.pegarInformacaoUnidade(unidade)
          .subscribe(
              response => {

                this.unidade = new Unidade(
                  unidade.unidade_id,
                  response.infos.activity_amount,
                  response.infos.average_duration_per_case,
                  response.infos.average_events_per_case,
                  response.infos.case_amount,
                  response.infos.event_amount,
                  response.infos.events_per_case,
                  response.infos.median_duration,
                  response.infos.variant_amount,
                );
                
                this.inputsInformacaoPedido = this.criarInputsModalInformacoesPedido();
                this.carregamentoInformacao = false;
              },
              responseError => {    
                console.log(responseError)
              }
          );
    }

  //********************************************************
  //   Manipulação de Informações do Processo(XML -> JSON)
  //********************************************************

    transformarXMLParaJSON(xml: string){
       this.responseXML = xml;
       this.json = xml2json(xml, {compact: true, spaces: 4});
    }

    formatarProcessoJSON(json:any){
      let itensProcesso = json.svg.g.g;
      let movimentoLista : Movimento[] = []
      itensProcesso.forEach((item:any) => {
        
        if(!item.g.length){
          movimentoLista.push(
            new Movimento(
              item.g.a.text[0]._text,
              item.g.a.text[1]._text,
              undefined
            )
          )         
        }
        else{
          let tempo = item.g[1].a.text._text
          let nome = item.g[1].a._attributes['xlink:title']
          movimentoLista.push(
            new Movimento(
              nome,
              undefined,
              tempo
            )
          )
        }
      });

      movimentoLista[0].tempo = movimentoLista[2].tempo;
      movimentoLista[1].tempo = movimentoLista[7].tempo;
      movimentoLista[3].tempo = movimentoLista[5].tempo;
      movimentoLista[4].tempo = movimentoLista[6].tempo;

      this.processo = new Processo(
       this.inputValue,
       movimentoLista[0],
       movimentoLista[1],
       movimentoLista[3],
       movimentoLista[4]
      )
      this.tabelaItemList.push(this.processo);
    }

  //********************************************************
  //            Renderizar XML no Modal
  //********************************************************

    renderizarProcessoXML(){
      const parser = new DOMParser();
      const xml = parser.parseFromString(String(this.responseXML), 'application/xml');
      this.xml = xml.documentElement.outerHTML;
      this.processoXML = this.sanitizer.bypassSecurityTrustHtml(this.xml);
    }
  
    rastrearInput(e:any){
      this.inputValue = e.target.value;
    }

    enviarFormulario(e:any){
      e.preventDefault();
      this.inputValue = "";
      this.fecharModal();
    }

  //********************************************************
  //                  Exibições de Modal
  //********************************************************
    
    abrirModal(){
      document.querySelector('.modal')?.classList.add('modal-ativo');
      document.querySelector('.modal')?.classList.remove('modal-inativo');
    }

    fecharModal(){
      let modal = document.querySelector('.modal');
      modal?.classList.add('modal-inativo');
      modal?.classList.remove('modal-ativo');
      
      setTimeout(() => {
        modal?.firstElementChild?.classList.remove('h-200px');
        this.inputLeituraTempoModal = false;
        this.mostrarXMLModal = false;
        this.mostrarInformacoesPedidoModal = false;
        this.limparCamposModais();
      }, 400);
      
      this.carregamentoInformacao= false;
    }

  //********************************************************
  //        Preenchimento de Informações (Modal)
  //********************************************************

    preencherModalInformacoesTempo(e:any){
      this.inputLeituraTempoModal = true;
      this.mostrarXMLModal = false;
      this.mostrarInformacoesPedidoModal = false;
      this.modalTitle = e.currentTarget.id.trim();
      this.inputLeituraTempoContentModal = e.currentTarget.classList[0];
      
      if(this.modalTitle == "Petição" || this.modalTitle == "Conclusão" || this.modalTitle == "Desistência"){
        this.modalLabelTitle =`Tempo da ${this.modalTitle}`;
      }
      
      document.querySelector('.modal')?.firstElementChild?.classList.add('h-200px');

    }

    preencherModalInformacoesPedido(e:any){
      let unidade:Unidade = new Unidade(
        e.currentTarget.id.trim(),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,);

      this.recuperarInformacoesProcesso(unidade);
      this.inputLeituraTempoModal = false;
      this.mostrarXMLModal = false;

    }

    criarInputsModalInformacoesPedido(){ 
      let inputs = [
        new Input(
          "Duração Média do Pedido",
          this.unidade?.duracaoMedia ?? "",
        ),
        new Input(
          "Duração Média por Caso",
          this.unidade?.duracaoMediaPorCaso?? "",
        ),
        new Input(
          "Quantidade de Atividades",
          this.unidade?.quantidadeAtividade ?? "",
        ),
        new Input(
          "Quantidade de Casos",
          this.unidade?.quantidadeCasos ?? "",
        ),
        new Input(
          "Quantidade de Eventos",
          this.unidade?.quantidadeEventos ?? "",
        ),
        new Input(
          "Quantidade de Eventos por Caso",
          this.unidade?.quantidadeEventosPorCaso?? "",
        ),
        new Input(
          "Quantidade de Variação",
          this.unidade?.quantidadeVariacao ?? "",
        ),
        new Input(
          "Variação de Eventos por Caso",
          this.unidade?.variacaoEventosPorCaso ?? "",
        ),
      ]

      return inputs;

    }

    mostrarImagemModal(event:any){
      this.mostrarXMLModal = true;
      this.inputLeituraTempoModal = false;
      this.mostrarInformacoesPedidoModal = false;
      this.renderizarProcessoXML();
    }

  //********************************************************
  //        Limpeza de Informações (Modal)
  //******************************************************** 

    limparCamposModais(){
      this.modalTitle = "";
      this.modalLabelTitle = "";
      this.inputLeituraTempoContentModal = "";
      this.inputsInformacaoPedido = [];
    }

}
