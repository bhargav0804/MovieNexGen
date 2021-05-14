import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LeftAsideComponent } from './left-aside/left-aside.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminMovieComponent } from './admin-movie/admin-movie.component';
import { AdminGenreComponent } from './admin-genre/admin-genre.component';
import { AdminStarCastComponent } from './admin-star-cast/admin-star-cast.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { BlockFormComponent } from './block-form/block-form.component';
import { GenreFormComponent } from './genre-form/genre-form.component';
import { StarCastFormComponent } from './star-cast-form/star-cast-form.component';
import { ActiveMoviesComponent } from './active-movies/active-movies.component';
import { BlockedMoviesComponent } from './blocked-movies/blocked-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [ AdminHomeComponent, LeftAsideComponent, AdminDashBoardComponent, AdminUserComponent, AdminMovieComponent, AdminGenreComponent, AdminStarCastComponent, ActiveUsersComponent, BlockedUsersComponent, BlockFormComponent, GenreFormComponent, StarCastFormComponent, ActiveMoviesComponent, BlockedMoviesComponent, AddMovieComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
  ,
  exports:[
    AdminHomeComponent,
    LeftAsideComponent,
    AdminDashBoardComponent,
    AdminUserComponent
  ]
})
export class AdminModule { }
