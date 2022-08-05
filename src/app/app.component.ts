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
    new reward(5000, 'ВЕЧЕР ФИЛЬМОВ УЖАСОВ'),
    new reward(10000, 'ДЕНЬ ИГРЫ В LOL НА КОНТРОЛЛЕРЕ'),
    new reward(15000, 'ИГРЫ СО ЗРИТЕЛЯМИ'),
    new reward(20000, 'ПРОБУЮ СУПЕР ОСТРУЮ ЕДУ'),
    new reward(25000, 'КАРАОКЕ (ПЕСНИ НА ВЫБОР ЧАТА)'),
    new reward(30000, 'СТРИМ ПО ДОТА 2'),
    new reward(35000, 'IRL СТРИМ В ПАРКЕ'),
    new reward(40000, 'БУХЛОСТРИМ LOL И APEX'),
    new reward(45000, 'СМОТРИМ АНИМЕ (НА ВЫБОР ЧАТА)'),
    new reward(50000, 'РОЗЫГРЫШ 50 СКИНОВ'),
    new reward(60000, 'СБРИВАЮ БОРОДУ (ОСТАВЛЯЮ УСЫ)'),
    new reward(75000, 'КРАШУ ВОЛОСЫ (ЦВЕТ ВЫБИРАЕТ ЧАТ)'),
    new reward(100000, '!GENERAL_HS ЧЕЛЛЕНЖ')
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
