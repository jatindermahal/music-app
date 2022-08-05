import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any = {};

  id: number = 0;
  private sub: any;
  private albumSub: any;
  
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private data: MusicDataService
  ) {}

  addToFavourites(trackID: any): void {

    this.snackBar.open('Adding to Favourites...', 'Okay', { duration: 500 });

    this.data.addToFavourites(trackID).subscribe({
      next: (success) => {
        this.snackBar.open('Added to Favourites', 'Okay', { duration: 1500 });
      },
      error: (err) => {
        console.log(err);
        this.snackBar.open('Unable to add song to Favourites', 'Okay', { duration: 1500 });
      }
    })

  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.albumSub = this.data
        .getAlbumById(this.id)
        .subscribe((data) => (this.album = data));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.albumSub.unsubscribe();
  }
}
