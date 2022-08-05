import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: Array<any> = [];
  private newReleasesSub: any;

  constructor(private data: MusicDataService) {}

  ngOnInit(): void {
    this.newReleasesSub = this.data.getNewReleases().subscribe((data) => {
      this.releases = data.albums.items;
    });
  }

  ngOnDestroy() {
    this.newReleasesSub.unsubscribe();
  }
}
