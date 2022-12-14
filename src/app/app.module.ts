import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessosTableComponent } from './pages/processos-table/processos-table.component';
import { HeaderComponent } from './components/header/header.component';
import { IdentificacaoPaginaComponent } from './components/identificacao-pagina/identificacao-pagina.component';
import { TableComponent } from './components/table/table.component';
import { BrokerBackendService } from './services/brocker-backend/brocker-backend.service';
import { ProcessoServiceService } from './services/processo-service/processo-service.service';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessosTableComponent,
    HeaderComponent,
    IdentificacaoPaginaComponent,
    TableComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BrokerBackendService,
    ProcessoServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
