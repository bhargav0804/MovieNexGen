import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './admin/add-movie/add-movie.component';
import { AdminDashBoardComponent } from './admin/admin-dash-board/admin-dash-board.component';
import { AdminGenreComponent } from './admin/admin-genre/admin-genre.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminMovieComponent } from './admin/admin-movie/admin-movie.component';
import { AdminStarCastComponent } from './admin/admin-star-cast/admin-star-cast.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './user/home/home.component';
import { MovieCardGridComponent } from './user/movie-card-grid/movie-card-grid.component';
import { MovieDetailsComponent } from './user/movie-details/movie-details.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRoles: ['other'],
    },
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    component: RegisterComponent,
    data: {
      expectedRoles: ['other'],
    },
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: {
      expectedRoles: ['User'],
    },
    children: [
      { path: '', component: HomeComponent },
      { path: 'movie-details/:id', component: MovieDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'movieGrid/:type', component: MovieCardGridComponent },
    ],
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      expectedRoles: ['Admin'],
    },
    children: [
      { path: '',redirectTo:'/admin/(adminoutlet:dashboard)',pathMatch:'full' },
      {
        path: 'dashboard',
        component: AdminDashBoardComponent,
        outlet: 'adminoutlet',
      },
      {
        path: 'movies',
        outlet: 'adminoutlet',
        children: [
          { path: '', component: AdminMovieComponent },
          { path: 'addmovie', component: AddMovieComponent },
          { path: 'editmovie/:id', component: AddMovieComponent },
        ],
      },
      { path: 'users', outlet: 'adminoutlet', component: AdminUserComponent },
      { path: 'genres', outlet: 'adminoutlet', component: AdminGenreComponent },
      {
        path: 'starcasts',
        outlet: 'adminoutlet',
        component: AdminStarCastComponent,
      },
      {
        path: '**',

        component: PageNotFoundComponent,
      },

     
    ],
  },
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
