import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BetBuilderService {
  private REST_API_SERVER = "http://cms.bettorlogic.com/api/BetBuilder";
  constructor(private httpClient: HttpClient) { }

  public getFixtures():Observable<any>{
    return this.httpClient.get<any>(this.REST_API_SERVER + "/GetFixtures?sports=1");
  }

  public getLegs():Observable<any>{
    return this.httpClient.get<any>(this.REST_API_SERVER + "/GetSelections?sports=1");
  }

  public getMarket():Observable<any>{
    return this.httpClient.get<any>(this.REST_API_SERVER + "/GetMarkets?sports=1");
  }

  public getBetBuilderBets(matchId:number,marketId:number,legs:number):Observable<any>{
    return this.httpClient.get<any>(this.REST_API_SERVER + "/GetBetBuilderBets?sports=1&matchId="+matchId+"&marketId="+marketId+"&legs="+legs+"&language=en");
  }
}
