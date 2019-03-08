import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { PortifolioClientesComponent } from './portifolio-clientes.component';

@NgModule({
  declarations: [
    PortifolioClientesComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
  ],
  exports: [
    PortifolioClientesComponent
  ]
})
export class PortifolioClientesModule { }
