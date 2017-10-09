import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ParkAttraction, ParksService } from '../shared/';

@Component({
  selector: 'ga-resort-details',
  templateUrl: './resort-details.component.html',
  host: { 'class': 'content-wrapper' },
  styles: []
})
export class ResortDetailsComponent implements OnInit {

  attractions: ParkAttraction[];
  filters: string[];
  parks$: Observable<any[]>;
  resortId: string;
  resortName: string;

  constructor(
    private parksService: ParksService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filters = [];

    this.route.params.subscribe((params: Params) => {
      this.resortId = params['resortId'];

      this.resortName = this.parksService.getResortName(this.resortId);

      /* get parks for grid */
      this.getResortDetails();

      /* get attractions list */
      this.getResortAttractions();

    });
  }

  filterType(type: string): void {
    let i = this.filters.indexOf(type);
    if(i == -1) {
      this.filters.push(type);
    } else {
      this.filters.splice(i, 1);
    }
  }

  private getResortAttractions(): void {
    this.parksService.getResortAttractions(this.resortId)
      .subscribe(
        (attrs: ParkAttraction[]) => {
          this.attractions = attrs;
        }
      );
  }

  private getResortDetails(): void {
    this.parks$ = this.parksService.getResortDetails(this.resortId);
  }

}