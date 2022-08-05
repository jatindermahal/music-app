import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];
  private favouriteSub: any;
  
  constructor(private data: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) {}
  
  removeFromFavourites(id: string): void {
    this.snackBar.open('Removing from Favourites', 'Okay', { duration: 300 });

    this.favouriteSub = this.data
      .removeFromFavourites(id)
      .subscribe((data) => (this.favourites = data.tracks));
  }


  ngOnInit(): void {
    this.favouriteSub = this.data
      .getFavourites()
      .subscribe((data) => (this.favourites = data.tracks));
  }
  ngOnDestroy(): void {
    this.favouriteSub.unsubscribe();
  }
}
