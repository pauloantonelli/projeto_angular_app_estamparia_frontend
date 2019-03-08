import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';

import { RodapeComponent } from './rodape.component';


@NgModule({
  declarations: [
    RodapeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
  ],
  exports: [
    RodapeComponent
  ]
})
export class RodapeModule { }
