import { Component, OnInit } from '@angular/core';

import { PassengerDashboardService } from '../../passenger-dashboard.service';

import 'rxjs/add/operator/switchMap';

import { Passenger } from '../../models/passenger.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'passenger-viewer',
  styleUrls: ['./passenger-viewer.component.scss'],
  template: `
    <div>
    <button (click)="goBack()">&lsaquo; Go Back</button>
      <passenger-form
      [detail]="passenger"
      (update)="onUpdatePassenger($event)">
      </passenger-form>
    </div>
  `,
})
export class PassengerViewerComponent {
  passenger: Passenger;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((data: Passenger) =>
        this.passengerService.getPassenger(data.id)
      )
      .subscribe((data: Passenger) => (this.passenger = data));
  }

  onUpdatePassenger(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passenger = Object.assign({}, this.passenger, event);
      });
  }
  goBack() {
    this.router.navigate(['/passengers']);
  }
}
