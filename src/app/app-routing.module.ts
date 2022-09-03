import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessosTableComponent } from './pages/processos-table/processos-table.component';

const routes: Routes = [
  {path:'', component: ProcessosTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
