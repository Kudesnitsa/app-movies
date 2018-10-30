import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie} from '../movie/movie';
import {environment as env} from '../../environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  allMovies: {};
  page: number;
  total: number;
  loading: boolean;
  url: string;
  urlImage: string;
  defaultImage: string;
  private moviesService: MoviesService;

  constructor(moviesService: MoviesService) {
    this.url = env.moviesUrl + '/popular';
    this.urlImage = env.moviesImageUrl;
    this.moviesService = moviesService;
    this.defaultImage = env.defaultImage;
    this.page = 1;
    this.total = 0;
    this.loading = false;
    this.movies = [];
    this.allMovies = {};
    this.getDataPerPage(this.page);
  }

  getDataPerPage(page: number): void {
    this.page = page;
    this.loading = true;
    if (this.allMovies[page]) {
      this.movies = this.allMovies[page];
    }

    this.moviesService.get<{ total_results: number, results: Movie[] }>({
      url: this.url,
      params: {
        'api_key': env.apiKey,
        'page': page
      }
    }).then(
      response => {
        this.total = response.total_results;
        this.loading = false;
        this.movies = response.results;
        this.allMovies[page] = response.results;
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
