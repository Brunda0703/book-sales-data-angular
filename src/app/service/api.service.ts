import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class apiService {

    constructor(private httpclient: HttpClient) { }
    // fetching the sales data from 2009 to 2019 
    getBookSaleData(): Observable<any> {
        return this.httpclient.get('https://books-api-data.herokuapp.com/datasets');
    }
    //fetching the yearly base fiction and non fiction count
    getYearlySaleData(): Observable<any> {
        return this.httpclient.get('https://books-api-data.herokuapp.com/books');
    }
}