import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processos-table',
  templateUrl: './processos-table.component.html',
  styleUrls: ['./processos-table.component.scss']
})
export class ProcessosTableComponent implements OnInit {

  constructor() { }
  terra = ['Processo', 'Cliente', 'Data de Abertura', 'Data de Encerramento', 'Status', 'Ações']
  tabelaColun = ['Processo', 'Cliente', 'Data de Abertura', 'Data de Encerramento', 'Status', 'Ações'];
  tabelaItemList = [this.terra, this.terra, this.terra];
  
  ngOnInit(): void {
/*     var convert = require('xml-js');
    var xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<note importance="high" logged="true">' +
    '    <title>Happy</title>' +
    '    <todo>Work</todo>' +
    '    <todo>Play</todo>' +
    '</note>';
    var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
    var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
    console.log(result1, '\n', result2); */
  }

}
