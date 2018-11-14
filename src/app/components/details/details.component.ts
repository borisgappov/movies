import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OmdbService } from '../../services/omdb.service';
import { DxLoadPanelComponent } from 'devextreme-angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit {

  movieId: string;
  @Input() embeddedMovieId: string;
  @ViewChild(DxLoadPanelComponent) loading: DxLoadPanelComponent
  @ViewChild('container') container: ElementRef;
  details: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private omdb: OmdbService) { }

  ngOnInit() {
    if(this.embeddedMovieId){
      this.movieId = this.embeddedMovieId;
      this.init();
    } else {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.movieId = params['id'];
        this.init();
      });
    }
  }

  ngAfterViewInit() {
    if(this.embeddedMovieId){
      this.loading.instance.option({position: { of: this.container.nativeElement }});
    }
    this.loading.instance.show();
  }

  init(){
    this.omdb.getDetails(this.movieId).subscribe((data)=>{
      this.details = data;
      this.loading.instance.hide();
    });
  }

}
