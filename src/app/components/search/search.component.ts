import { Component, OnInit, ViewChild } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild(DxDataGridComponent) grid: DxDataGridComponent
  dataSource: any = {};

  get filter(): string {
    return localStorage['filter'];
  }
  set filter(val: string) {
    localStorage['filter'] = val;
    this.grid.instance.refresh();
  }

  constructor(
    private omdb: OmdbService,
    private router: Router) { 
    this.dataSource.store = omdb.getDataStore();
  }

  ngOnInit() {
    if(typeof(localStorage['filter']) == 'undefined'){
      localStorage['filter']='Bond';
    }
  }

  openDetails(item){
    this.router.navigate(['details',item.data.imdbID]);
  }

}
