import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
 
const materialComponent=[
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatGridListModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatDividerModule,
  MatToolbarModule,
  MatSelectModule,
  MatBadgeModule,
  MatMenuModule,
  MatListModule,
  MatChipsModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot(),
  MatPaginatorModule,
  MatFormFieldModule,
  MatTableModule,
  MatAutocompleteModule,
  NgxInputStarRatingModule
]

@NgModule({
  declarations: [],
  imports: [
    materialComponent
  ],
  exports:[
    materialComponent
  ]
})
export class MaterialModule { }
