import { Component, OnInit } from '@angular/core';
import { IVisitCard, VisitCard } from '../../../models/visitCard';
import { ISearchRequest, SearchRequest } from '../../../models/serchRequest.js';
import { RestService } from '../../../services/rest-service/rest.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  // if 0 -> List view if 1 -> Card View 2-> Search View
  public viewMode = 0;

  // Card and Searchbar variables
  public cardList = [];
  public searchbar = document.querySelector('ion-searchbar');
  public queriedCards = [];
  public queryText: string;

  // Filter tab variables
  public ratingRange = {lower: 0, upper: 0};
  public priceRange = {lower: 0, upper: 0};
  public maxDuration = '2019-10-01T01:00:00.000Z';
  public groupRange = {lower: 0, upper: 0};
  public distance = 80;
  private id = 0;
  private country = 'Portugal';
  private latitude = 38.762396;
  private longitude = -9.282215;
  private searchResponse;


  constructor(
      private restService: RestService,
      public toastController: ToastController
  ) {}

  ngOnInit() {
    this.sendSearchRequest(
        this.id,
        this.country,
        0,
        9999999999,
        0,
        5,
        '2019-10-01T09:00:00.000Z',
        0,
        10,
        50000,
        this.latitude,
        this.longitude,
        'K'
    );
    this.queriedCards = this.cardList;
  }

  changeViewMode(ev: any) {
    this.viewMode = ev.detail.value;
  }

  // Load data for infinite scroll
  loadData(event) {
    setTimeout( () => {
      console.log('Done');
      this.sendSearchRequest(this.id,
          this.country,
          this.priceRange.lower,
          this.priceRange.upper,
          this.ratingRange.lower,
          this.ratingRange.upper,
          this.maxDuration,
          this.groupRange.lower,
          this.groupRange.upper,
          this.distance,
          this.latitude,
          this.longitude,
          'K');
      this.handleInput();
      event.target.complete();
    }, 2000);
  }

  // Handle searchbar text
  handleInput() {
    if (this.queryText) {
      this.queriedCards = [];
      for (const card of this.cardList) {
        if (card.title.toLowerCase().includes(this.queryText.toLowerCase())) {
          this.queriedCards.push(card);
        }
      }
    } else {
      this.queriedCards = this.cardList;
    }
  }

  sendSearchRequest(
                    id,
                    country,
                    priceRangeLower,
                    priceRangeUpper,
                    ratingRangeLower,
                    ratingRangeUpper,
                    maxDuration,
                    groupRangeLower,
                    groupRangeUpper,
                    distance,
                    latitude,
                    longitude,
                    unit) {

    if (priceRangeUpper === 30) {
      priceRangeUpper = 9999999999;
    }

    if (distance === 160) {
      distance = 50000;
    }

    const request: ISearchRequest = new SearchRequest(
        id,
        country,
        priceRangeLower,
        priceRangeUpper,
        ratingRangeLower,
        ratingRangeUpper,
        maxDuration.slice(11, 19),
        groupRangeLower,
        groupRangeUpper,
        distance,
        latitude,
        longitude,
        unit
        );
    console.log(request);
    this.restService.getSearchCards(request, this.restService.SEARCH_ADRESS, '/getSearchCards').subscribe(
        res => {
          this.searchResponse = res;

          if (this.searchResponse.cards.length === 0) {
            this.presentToast('All visits are loaded', 'medium');
          }

          for (const card of this.searchResponse.cards) {
            const newCard: IVisitCard = new VisitCard
            (
                card.id,
                card.title,
                card.first_name,
                card.last_name,
                card.duration,
                card.min_group_size,
                card.max_group_size,
                card.price_person,
                card.rating,
                card.img1
            );
            console.log(newCard);
            this.cardList.push(newCard);
          }
        },
        error => {
          console.log(error);
        });
  }

  async presentToast( registerMessage, color ) {
    const toast = await this.toastController.create({
      message: registerMessage,
      duration: 2000,
      color
    });
    toast.present();
  }
}
