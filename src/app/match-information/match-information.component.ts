import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BetBuilderService } from '../services/bet-builder.service';

@Component({
  selector: 'app-match-information',
  templateUrl: './match-information.component.html',
  styleUrls: ['./match-information.component.css']
})
export class MatchInformationComponent {

  @Input() matchId!: number;
  @Input() headerDate!: Date;
  @Input() matchName!: string;
  @Output() backEvent = new EventEmitter();

  selectedLegId!: number;
  selectedMarketId!: number;
  legs!: string;
  markets!: string;
  betBuilder!: string;
  betBuilderArray: any[] = [];
  legsArray: any[] = [];
  marketArray: any[] = [];

  constructor(private betBuilderService: BetBuilderService) { }

  ngOnInit() {
    this.getLeg();
    this.getMarket();
    //this.getBetBuilderBets();
  }

  back() {
    this.backEvent.emit();
  }

  getLeg() {
    this.betBuilderService.getLegs().subscribe((data: any[]) => {
      this.legs = JSON.stringify(data);
      this.legsArray = JSON.parse(this.legs);

      if (this.legsArray.length > 0) {
        this.selectedLegId = this.legsArray[0].selectionId;
      }
    });
  }

  getMarket() {
    this.betBuilderService.getMarket().subscribe((data: any[]) => {
      this.markets = JSON.stringify(data);
      this.marketArray = JSON.parse(this.markets);

      if (this.marketArray.length > 0) {
        this.selectedMarketId = this.marketArray[0].MarketId;
      }
    });
  }

  getBetBuilderBets() {
    console.log("matchId", this.matchId);
    console.log("this.selectedMarketId", this.selectedMarketId);
    console.log("this.selectedLegId", this.selectedLegId);
    this.betBuilderService.getBetBuilderBets(this.matchId, this.selectedMarketId, this.selectedLegId).subscribe((data: any[]) => {
      // this.betBuilder = JSON.stringify(data);
      // this.betBuilderArray = JSON.parse(this.betBuilder);
      this.betBuilderArray = data as any[];
      console.log("BIGDATA", data);
      console.log("this.betBuilder", this.betBuilder);
      console.log("his.betBuilderArray", this.betBuilderArray);
    });
  }

  onLegSelectionChange(event: any) {
    this.selectedLegId = event.target.value;
  }
  onMarketSelectionChange(event: any) {
    this.selectedMarketId = event.target.value;
  }
}
