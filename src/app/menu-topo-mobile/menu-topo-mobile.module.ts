import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MenuTopoMobileComponent } from './menu-topo-mobile.component';
@NgModule({
  declarations: [
    MenuTopoMobileComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    MenuTopoMobileComponent
  ]
})
export class MenuTopoMobileModule { }
