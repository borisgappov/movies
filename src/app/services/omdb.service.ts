import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import CustomStore from 'devextreme/data/custom_store';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private httpClient: HttpClient) { }

  getDataStore() {
    return new CustomStore({
      key: 'imdbID',
      load: (options: any) => {
        return this.httpClient.get(`${environment.url}?apikey=${environment.key}&s=${localStorage['filter']}`)
          .toPromise()
          .then((data: any) => {
            return data.Search ? {
              data: data.Search,
              totalCount: data.totalResults
            } : {
              data: [],
              totalCount: 0
            };
          })
          .catch(error => { throw 'Data Loading Error' });
      }
    });
  }

  getDetails(id): Observable<Object>{
    return this.httpClient.get(`${environment.url}?apikey=${environment.key}&i=${id}`);
  }

}
