import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AppContextService } from '../services/app-context.service';
import { RequestReponsePair } from '../model/request-reponse-pair';

@Injectable()
export class HttpLoggingInterceptor implements HttpInterceptor {
  constructor(private _contextService: AppContextService) {}


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).do(evt => {
      if (evt instanceof HttpResponse && req instanceof HttpRequest) {
        console.log('---> request method:' , req.method);
        console.log('---> request method:' , req.body);
        console.log('---> response status:', evt.status);
        console.log('---> response body:', evt.body);
        const loggingContainer = new RequestReponsePair(req.url, req.method, req.body, evt.status, evt);
        this._contextService.loggingTrafficList.push(loggingContainer);
      }
    });
  }
}
