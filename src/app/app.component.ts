import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

class reward{
  constructor(public price: number, public value: string) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'css-graphics-practice';
  money = 10000;

  flaskHeight = 800;


  fontHeight = 37;
  currentHeight = 200;
  marginBottom = 10;

  partHeight = 100;

  data: reward[] = [
    new reward(5000, 'HORROR MOVIE NIGHT'),
    new reward(10000, 'PLAYING LOL ON THE CONTROLLER'),
    new reward(15000, 'PLAYING WITH VIEWERS'),
    new reward(20000, 'TASTE SUPER SPICY FOOD'),
    new reward(25000, 'KARAOKE WITH VIEWERS'),
    new reward(30000, 'PLAY DOTA 2'),
    new reward(35000, 'STREAM WITH FAMILY'),
    new reward(40000, 'STREAM WITH FRIENDS'),
    new reward(45000, 'ANIME STREAM'),
    new reward(50000, 'GIVEAWAY'),
    new reward(60000, 'SHAVE OFF MY BEARD'),
    new reward(75000, 'DYE MY HAIR'),
    new reward(100000, 'GIVEAWAY 2')
  ]


  private querySubscription: Subscription


  constructor(public activateRoute: ActivatedRoute){

    this.marginBottom = this.calcMargin(
      this.flaskHeight - (this.data.length * this.fontHeight),
      this.data.length
    )

    this.partHeight = this.marginBottom + this.fontHeight;

    this.querySubscription = activateRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.money = queryParam['money']

        let last_id = this.findIdLastNotReached(this.money, this.data);

        if(last_id >= this.data.length){
          this.money = this.data[this.data.length - 1].price
        }

        let next_percent;

        if(last_id == 0){

          if(this.money == 0){
            next_percent = 0;
          } else {
            next_percent = this.money / this.data[last_id].price
          }

        }else{

          if(this.money - this.data[last_id - 1].price == 0){
            next_percent = 0;
          } else {
            next_percent = (this.money - this.data[last_id - 1].price) / (this.data[last_id].price - this.data[last_id - 1].price)
          }

        }


        this.currentHeight = this.calcCurrentHeight(last_id, next_percent);

      }
    )
  }

  calcMargin(freeSpace: number, partsNumber: number){
    return freeSpace / (partsNumber + 1)
  }


  findIdLastNotReached(score: number, rewards: reward[]): number{
    for(let i = 0; i < rewards.length; i++){
      if(rewards[i].price > score){
        return i;
      }
    }

    return rewards.length;
  }

  calcCurrentHeight(partsDone: number, percentNextDone: number){
    if(partsDone == 0){
      return (this.marginBottom + this.fontHeight / 2) * percentNextDone;
    }else{
      return (partsDone - 1) * this.partHeight + percentNextDone * this.partHeight + (this.marginBottom + this.fontHeight / 2);
    }

  }
}
