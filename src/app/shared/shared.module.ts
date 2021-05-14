import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],exports:[
    HeaderComponent
  ]
})
export class SharedModule { }
