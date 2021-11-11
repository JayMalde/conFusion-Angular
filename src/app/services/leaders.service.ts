import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { catchError, delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {promise} from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable()
export class LeaderService {

  constructor(private http:HttpClient, private processHttpMsgService:ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}