import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FindBooksCriteria } from '../interfaces/find-books-criteria.interface';
import { Observable, of } from 'rxjs';
import { BooksHTTPResponse } from '../interfaces/books-http-response.interface';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const DEFAULT_RESPONSE: BooksHTTPResponse = {
  items: [],
  kind: '',
  totalItems: 0,
};

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  find(criteria: FindBooksCriteria): Observable<BooksHTTPResponse> {
    const startIndex = criteria.pageIndex * criteria.pageSize;
    const url = `${API_URL}?orderBy=newest&q=${criteria.searchTerm}&startIndex=${startIndex}&maxResults=${criteria.pageSize}&langRestrict=${criteria.currentLanguageCode}`;
    if (!criteria.searchTerm) return of(DEFAULT_RESPONSE);
    return this.httpClient.get<BooksHTTPResponse>(url);
  }
}
