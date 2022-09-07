import { Component, Inject, OnInit } from '@angular/core';
import { Movimento } from 'src/app/models/movimento.model';
import { Processo } from 'src/app/models/processo.model';
import { ProcessoServiceService } from 'src/app/services/processo-service/processo-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Unidade } from 'src/app/models/unidade.model';
import { Input } from 'src/app/models/input.model';


@Component({
  selector: 'app-processos-table',
  templateUrl: './processos-table.component.html',
  styleUrls: ['./processos-table.component.scss']
})
export class ProcessosTableComponent implements OnInit {

  constructor(
    private service: ProcessoServiceService,
    private sanitizer:DomSanitizer
    
  ) { }
  convert = require('xml-js')
  tabelaColun = ['Processo', 'Conclusão', "",'Petição', "", 'Desistência',"",'Expedição'];
  tabelaItemList : Processo[] = [];
  json = "";
  xml = "";
  responseXML:any;
  processo: Processo|undefined;
  modalTitle = "";
  labelTitle = "";
  inputLeituraContent = "";
  mostrarImagem = false;
  inputLeitura = false;
  processoXML: any = "";
  unidade: Unidade | undefined;
  inputsInformacaoPedido: Input[] = [];
  mostrarInformacoesPedido = false;
  inputValue:string = "";
  carregamentoInformacao:boolean = false;
  
  ngOnInit(): void {
    this.recuperarImagemProcesso();
  }

  //********************************************************
  //              Listagem de vagas por empresa
  //********************************************************

    recuperarImagemProcesso(){
      this.carregamentoInformacao = true;
      this.service.getImagem()
          .subscribe(
              response => {
              },
              responseError => {    
                this.transformarXMLParaJSON(responseError.error.text)
                this.formatarProcessoJSON(JSON.parse(this.json));
                this.carregamentoInformacao = false;
              }
          );
    }

    consultarUnidade(){
      this.carregamentoInformacao = true;
      this.service.getImagemConsulta(this.inputValue)
          .subscribe(
              response => {
              },
              responseError => {    
                this.transformarXMLParaJSON(responseError.error.text)
                this.formatarProcessoJSON(JSON.parse(this.json));
                this.carregamentoInformacao = false;
              }
          );
    }

    recuperarInformacoesProcesso(unidade:Unidade){
      this.carregamentoInformacao = true;
      this.mostrarInformacoesPedido = true;
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

    transformarXMLParaJSON(xml: string){
       this.responseXML = xml;
       this.json = this.convert.xml2json(xml, {compact: true, spaces: 4});
    }

    renderizarProcessoXML(){
      const parser = new DOMParser();
      const xml = parser.parseFromString(String(this.responseXML), 'application/xml');
      this.xml = xml.documentElement.outerHTML;
      this.processoXML = this.sanitizer.bypassSecurityTrustHtml(this.xml);
    }

    formatarProcessoJSON(json:any){
      let itensProcesso = json.svg.g.g;
      let movimentoLista : Movimento[] = []
      itensProcesso.forEach((item:any, index:Number) => {
        
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
       "7065",
       movimentoLista[0],
       movimentoLista[1],
       movimentoLista[3],
       movimentoLista[4]
      )
      this.tabelaItemList.push(this.processo);
    }

    rastrearInput(e:any){
      this.inputValue = e.target.value;
    }

    enviarFormulario(e:any){
      e.preventDefault();
      console.log(this.inputValue)
      this.inputValue = "";
      this.fecharModal();
    }

    fecharModal(){
      let modal = document.querySelector('.modal');
      modal?.classList.add('modal-inativo');
      modal?.classList.remove('modal-ativo');
      setTimeout(() => {
        modal?.firstElementChild?.classList.remove('h-200px');
        this.inputLeitura = false;
        this.mostrarImagem = false;
        this.mostrarInformacoesPedido = false;
        this.limparCamposModais();
      }, 400);
      this.carregamentoInformacao= false;
    }

    abrirModal(){
      document.querySelector('.modal')?.classList.add('modal-ativo');
      document.querySelector('.modal')?.classList.remove('modal-inativo');
    }


    preencherModalInformacoesTempo(e:any){
      this.inputLeitura = true;
      this.mostrarImagem = false;
      this.mostrarInformacoesPedido = false;
      this.modalTitle = e.currentTarget.id.trim();
      this.inputLeituraContent = e.currentTarget.classList[0];
      
      if(this.modalTitle == "Petição" || this.modalTitle == "Conclusão" || this.modalTitle == "Desistência"){
        this.labelTitle =`Tempo da ${this.modalTitle}`;
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
      this.inputLeitura = false;
      this.mostrarImagem = false;
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
      this.mostrarImagem = true;
      this.inputLeitura = false;
      this.mostrarInformacoesPedido = false;
      this.renderizarProcessoXML();
    }

    limparCamposModais(){
      this.modalTitle = "";
      this.labelTitle = "";
      this.inputLeituraContent = "";
      this.inputsInformacaoPedido = [];
    }

}
