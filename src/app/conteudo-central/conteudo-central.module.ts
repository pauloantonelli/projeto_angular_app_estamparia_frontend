import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ConteudoCentralComponent } from './conteudo-central.component';
import { ContatoComponent } from './contato/contato.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { SublimacaoComponent } from './sublimacao/sublimacao.component';

@NgModule({
  declarations: [
    ConteudoCentralComponent,
    ContatoComponent,
    OrcamentoComponent,
    SublimacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    ConteudoCentralComponent
  ]
})
export class ConteudoCentralModule { }
