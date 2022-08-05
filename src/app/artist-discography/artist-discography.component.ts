import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any = [];
  artist: any = {};
  id: number = 0;

  private sub: any;
  private artistSub: any;
  private albumsSub: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.artistSub = this.data
        .getArtistById(this.id)
        .subscribe((data) => (this.artist = data));
      this.albumsSub = this.data
        .getAlbumsByArtistId(this.id)
        .subscribe(
          (data) =>
            (this.albums = data.items.filter(
              (curValue, index, self) =>
                self.findIndex(
                  (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
                ) === index
            ))
        );
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
  }
}
