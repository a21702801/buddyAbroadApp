import { Component, OnInit } from '@angular/core';
import { IVisitCard, VisitCard } from '../../../models/visitCard';
import { ISearchRequest, SearchRequest } from '../../../models/serchRequest.js';
import { RestService } from '../../../services/rest-service/rest.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { JwtHandlerService } from '../../../services/jwt-handler/jwt-handler.service';

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
  public priceRange = {lower: 0, upper: 30};
  public ratingRange = {lower: 0, upper: 5};
  public maxDuration = '1994-12-15T08:00:00';
  public groupRange = {lower: 0, upper: 10};
  public distance = 160;
  private id = 0;

  // Sorting variable
  private sortOption = 'n';

  // Change for native geo info
  private country = 'Portugal';
  private latitude = 38.787711;
  private longitude = -9.390700;

  // Search Json
  private searchResponse;

  // Filters Settings
  private sameCountry = true;

  constructor(
      private restService: RestService,
      public toastController: ToastController,
      private storage: Storage,
      private jwtHandlerService: JwtHandlerService
  ) {}

  ngOnInit() {
    // Set location Variables
    this.storage.get('lat').then((val) => {
      this.latitude = val;
    });
    this.storage.get('lon').then((val) => {
      this.longitude = val;
    });
    this.storage.get('country').then((val) => {
      this.country = val;
    });
    this.loadNewCards();
  }

  changeViewMode(ev: any) {
    this.viewMode = ev.detail.value;
  }

  /** Infinite Scroll */
  // Load data for infinite scroll
  loadData(event) {
    setTimeout( () => {
      this.sendSearchRequest(
          this.id,
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

  /** SearchBar */
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

  /** Filter tab */
  // Send search request to server
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
    unit
  ) {

    if (priceRangeUpper === 30) {
      priceRangeUpper = 9999999999;
    }

    if (distance === 160) {
      distance = 9999999999;
    }

    const request: ISearchRequest = new SearchRequest
    (
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
    this.restService.getSearchCards(request, this.restService.SEARCH_ADRESS, '/getSearchCards').subscribe(
        res => {
          this.searchResponse = res;
          if (this.jwtHandlerService.verifyAuthentication(this.searchResponse.accessToken)) {
            if (this.searchResponse.cards.length === 0) {
              this.presentToast('All visits are loaded', 'medium');
            }
            let lastid;
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
              this.cardList.push(newCard);
              lastid = card.id;
            }
            this.id = lastid;
          }
        },
        error => {
          console.log(error);
        });
  }

  // Reset cards after new filters
  loadNewCards() {
    this.id = 0;
    this.cardList = [];
    this.sendSearchRequest(
        this.id,
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
        'K'
    );
    this.queriedCards = this.cardList;
  }

  /** Sorting cards */
  sortCards() {
    if (this.sortOption === 'a') {
      this.queriedCards.sort((card1, card2) => {
        return card1.rating - card2.rating;
      });
    } else if (this.sortOption === 'd') {
      this.queriedCards.sort((card1, card2) => {
        return  card2.rating - card1.rating;
      });
    } else if (this.sortOption === 'n') {
      this.queriedCards.sort((card1, card2) => {
        return  card2.id - card1.id;
      });
    }
  }

  /** Toaster */
  // present toaster function
  async presentToast( registerMessage, color ) {
    const toast = await this.toastController.create({
      message: registerMessage,
      duration: 2000,
      color
    });
    toast.present();
  }
}
