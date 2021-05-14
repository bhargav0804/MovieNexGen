import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(moviesList: any[], searchContent: string): any[] {
    let searchContentArray = searchContent.toLowerCase().split(',');
    let finalMovieList = [];

    if (moviesList.length == 0 && searchContent.length == 0) {
      return [];
    } else {
      searchContentArray.forEach(searchContent=>{
        if(searchContent != ''){
          moviesList.forEach((movie) => {
            if (
              movie.MovieTitle.toLowerCase().includes(searchContent) ||
              movie.Plot.toLowerCase().includes(searchContent) ||
              movie.Genres.some((genre) => genre.GenreName.toLowerCase().includes(searchContent)) ||
              movie.StarCasts.some((star) => star.StarCastName.toLowerCase().includes(searchContent))
            ) {
              if(!finalMovieList.includes(movie)){
                finalMovieList.push(movie);
              }
            }
          });
        }
      })      
      return finalMovieList;
    }
  }
}
