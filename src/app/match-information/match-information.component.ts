import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BetBuilderService } from '../services/bet-builder.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-match-information',
  templateUrl: './match-information.component.html',
  styleUrls: ['./match-information.component.css']
})
export class MatchInformationComponent {

  @Input() leagName!: string;
  @Input() headerDate!: Date;
  @Input() matchName!: string;
  @Output() backEvent = new EventEmitter();

  selectedLegId!: number;
  selectedMarketId!: number;
  legs!: string;
  markets!: string;
  betBuilder!: string;
  betBuilderArray: any;
  legsArray: any[] = [];
  marketArray: any[] = [];

  constructor(private betBuilderService: BetBuilderService) { }
  ngOnInit() {
    this.getLeg().subscribe(() => {
      this.getMarket().subscribe(() => {
        this.getBetBuilderBetss();
      });
    });
  }

  getLeg() {
    return this.betBuilderService.getLegs().pipe(
      tap((data: any[]) => {
        this.legs = JSON.stringify(data);
        this.legsArray = JSON.parse(this.legs);
        if (this.legsArray.length > 0) {
          this.selectedLegId = this.legsArray[0].selectionId;
        }
      })
    );
  }

  getMarket() {
    return this.betBuilderService.getMarket().pipe(
      tap((data: any[]) => {
        this.markets = JSON.stringify(data);
        this.marketArray = JSON.parse(this.markets);
        if (this.marketArray.length > 0) {
          this.selectedMarketId = this.marketArray[0].MarketId;
        }
      })
    );
  }

  back() {
    this.backEvent.emit();
  }

  getBetBuilderBetss() {
    console.log("this.selectedMarketId", this.selectedMarketId);
    console.log("this.selectedLegId", this.selectedLegId);
    this.betBuilderService.getBetBuilderBets(780388, this.selectedMarketId, this.selectedLegId).subscribe((data: any[]) => {
      this.betBuilder = JSON.stringify(data);
      this.betBuilderArray = JSON.parse(this.betBuilder);
    });
  }

  onLegSelectionChange(event: any) {
    this.selectedLegId = event.target.value;
    this.getBetBuilderBetss();
  }

  onMarketSelectionChange(event: any) {
    this.selectedMarketId = event.target.value;
    this.getBetBuilderBetss();
  }
}
