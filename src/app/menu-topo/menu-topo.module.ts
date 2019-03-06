import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MenuTopoComponent } from './menu-topo.component';
@NgModule({
  declarations: [
    MenuTopoComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    MenuTopoComponent
  ]
})
export class MenuTopoModule { }
