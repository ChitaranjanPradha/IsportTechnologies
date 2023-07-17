import { Component } from '@angular/core';
import { BetBuilderService } from '../services/bet-builder.service';


@Component({
  selector: 'app-match-home',
  templateUrl: './match-home.component.html',
  styleUrls: ['./match-home.component.css']
})

export class MatchHomeComponent {
  showDefault: boolean = true;
  showMatchDetails: boolean = false;
  title = 'BetBuilder';
  selectedDate!: string;
  startDate!: Date;
  numberOfDays: number = 7;
  dates: string[] = [];
  filteredMatches: any[] = [];
  originalData: any[] = [];
  leagueName!: string;
  passingDate!: Date;
  passingMatchName!: string;

  constructor(private betBuilderService: BetBuilderService) { }
  ngOnInit() {
    this.showDefault = true;
    this.showMatchDetails = false;
    this.startDate = new Date();
    this.generateDateSeries();
    this.getCompanyData();
    this.selectedDate = this.startDate.toString();
  }
  generateDateSeries() {
    for (let i = 0; i < this.numberOfDays; i++) {
      const date = new Date(this.startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = this.formatDate(date);
      this.dates.push(formattedDate);
    }
  }

  formatDate(date: Date): string {
    return date.toString();
  }

  getCompanyData() {
    this.betBuilderService.getFixtures().subscribe(
      (data: any[]) => {
        this.originalData = data as any[];
        this.filterMatches(this.selectedDate);
      });
  }


  filterMatches(date: string) {
    this.selectedDate = date;
    const dateString = this.selectedDate;
    const dateIST = new Date(dateString);
    const utcString = dateIST.toISOString();
    const utcDate = new Date(utcString);
    const utcFormatted = utcDate.toLocaleString("en-US", { month: 'numeric', day: 'numeric', year: 'numeric' });
    this.filteredMatches = this.originalData.filter(m => m.MatchDate.slice(0, 9) === utcFormatted);
  }

  onRowClick(countryName: string, leagueName:string, matchDate: Date, matchName: string) {
    this.leagueName = countryName+ " " + leagueName;
    this.passingDate = matchDate;
    this.passingMatchName = matchName;
    this.showDefault = false;
    this.showMatchDetails = true;
  }

  goToHome() {
    this.showDefault = true;
    this.showMatchDetails = false;
  }
}
