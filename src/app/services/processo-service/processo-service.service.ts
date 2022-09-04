import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Unidade } from 'src/app/models/unidade.model';
import { BrokerBackendService } from '../brocker-backend/brocker-backend.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessoServiceService {

  endpointImagem:string = `image/`;
  endpointInformacaoProcesso:string = 'infos/';

  constructor(
    private brokerBackend: BrokerBackendService,
  ) { }

  getImagem(): Observable<any> {
    let unidade = '7065/?detail_level=3'
    return this.brokerBackend
        .connectInBackend(
          this.endpointImagem,
          'GET',
          unidade,
          this.getSimpleHeader(),
        );
  }

  pegarInformacaoUnidade(unidade: Unidade): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          this.endpointInformacaoProcesso,
          'POST',
          unidade,
          this.getSimpleHeader()
        );
  }


  
  getSimpleHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
