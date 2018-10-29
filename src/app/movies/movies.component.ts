import {Component, OnInit} from '@angular/core';
import {MoviesService} from './movies.service';
import {Movie} from './movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  page: number;
  total: number;
  loading: boolean;
  url: string;
  private moviesService: MoviesService;

  constructor(moviesService: MoviesService) {
    this.moviesService = moviesService;
    this.page = 1;
    this.total = 0;
    this.loading = false;
    this.movies = [];
    this.getPage(this.page);
  }

  getPage(page: number) {
    this.url = 'https://api.themoviedb.org/3/movie/popular';
    this.page = page;
    this.loading = true;

    this.moviesService.get<{ total_results: number, results: Movie[] }>({
      url: this.url,
      params: {
        'api_key': '1a3eed084484cf7107b59023492ee813',
        'page': page
      }
    }).then(
      response => {
        this.total = response.total_results;
        this.loading = false;
        this.movies = response.results;
        console.log(response.results);
      }
    ).catch(
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
  }
}
