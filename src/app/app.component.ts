import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'css-graphics-practice';
  money = 10000;

  flaskHeight = 800;
  bitStep = 5000
  steps = 20 + 0.5;

  pixelToMoney =  this.flaskHeight / (this.steps * this.bitStep);
  currentHeight = this.flaskHeight / 2;


  private querySubscription: Subscription


  constructor(public activateRoute: ActivatedRoute){



    this.querySubscription = activateRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.money = queryParam['money']
        this.currentHeight = this.pixelToMoney * this.money;
        console.log(this.currentHeight)
      }
    )


  }
}
