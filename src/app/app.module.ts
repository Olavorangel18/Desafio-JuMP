import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessosTableComponent } from './pages/processos-table/processos-table.component';
import { HeaderComponent } from './components/header/header.component';
import { IdentificacaoPaginaComponent } from './components/identificacao-pagina/identificacao-pagina.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessosTableComponent,
    HeaderComponent,
    IdentificacaoPaginaComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
