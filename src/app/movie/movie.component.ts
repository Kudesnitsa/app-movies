import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Movie} from './movie';
import {ActivatedRoute} from '@angular/router';
import {environment as env} from '../../environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: Movie;
  url: string;
  urlImage: string;
  id: number;
  defaultImage: string;
  private moviesService: MoviesService;
  private route: ActivatedRoute;

  constructor(moviesService: MoviesService, route: ActivatedRoute) {
    this.movie = null;
    this.route = route;
    this.moviesService = moviesService;
    this.url = env.moviesUrl;
    this.urlImage = 'https://image.tmdb.org/t/p/w500';
    this.defaultImage = env.defaultImage;
  }

  loadMovie(id: number): void {
    this.moviesService.get<Movie>({
      url: this.url + '/' + id,
      params: {
        'api_key': env.apiKey
      }
    }).then(
      response => {
        // this.loading = false;
        this.movie = response;
        console.log(response);
      }
    ).catch(
      error => {
        // todo go back
        console.error(error);
      }
    );
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id && Number.isFinite(id)) {
      this.id = id;
      this.loadMovie(this.id);
    } else {
      // go back todo
    }
  }

}
