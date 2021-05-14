import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { BannerCarousalComponent } from './banner-carousal/banner-carousal.component';
import { MovieCardListComponent } from './movie-card-list/movie-card-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ProfileComponent } from './profile/profile.component';
import { MovieCardGridComponent } from './movie-card-grid/movie-card-grid.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [NavbarComponent, HomeComponent, MovieCardComponent, BannerCarousalComponent, MovieCardListComponent, MovieDetailsComponent, ProfileComponent, MovieCardGridComponent, ReviewCardComponent, SearchComponent, SearchFilterPipe, ReviewDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],exports:[
    HomeComponent,
    NavbarComponent
  ]
})
export class UserModule { }
