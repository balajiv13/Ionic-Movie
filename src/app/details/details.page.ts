import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interface/interface';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  private _id: string = '';
  private movieService = inject(MovieService);
  public movie: WritableSignal<MovieResult | null> = signal<MovieResult | null>(
    null,
  );
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  // // Load the movie details when the id changes through the URL :id parameter
  // @Input()
  // set id_(movieId: string) {
  //   console.log('*******', movieId)
  //   // This is just to show Signal usage
  //   // You could also just assign the value to a variable directly
  //   this.movieService.getMovieDetails(movieId).subscribe((movie) => {
  //     console.log('******', movie)
  //     this.movie.set(movie);
  //   });
  // }
  getMovieDetails(movieId: any) {
    console.log('*******', movieId)
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log('******', movie)
      this.movie.set(movie);
    });
  }



  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Param value:', id);
    this.getMovieDetails(id)
    // Load the the required ionicons
    addIcons({
      cashOutline,
      calendarOutline,
    });
  }
}
