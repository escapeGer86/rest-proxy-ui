import { Injectable } from '@angular/core';
import { ConsumerCreationContext } from '../model/consumer-creation-context';
import { RequestReponsePair } from '../model/request-reponse-pair';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  // public proxyUrl = 'http://192.168.99.100:8082';
  public proxyUrl = '/api';

  public sessionCustomerCreationContextList: ConsumerCreationContext[] = [];

  public loggingTrafficList: RequestReponsePair[] = [];

  constructor() { }
}
