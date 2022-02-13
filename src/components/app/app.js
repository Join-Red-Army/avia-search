import React, { Component } from 'react';
import FlySevrice from '../../fly-service';
import FormSort from '../form-sort';
import TicketList from '../ticket-list';


import './app.css';

export default class App extends Component {
  
  flySevrice = new FlySevrice();

  state = {
    flights: this.flySevrice.getAllFlights(),
    filteredFlights: null,
    allCarriers: this.flySevrice.getAllCarriers(),

    // значения в placeholder
    lowestPrice: this.flySevrice.lowestPrice,
    highestPrice: this.flySevrice.highestPrice,

    // фильтры
    selectedCarriers: [],
    segmentsNumber: [],

    minPrice: this.flySevrice.lowestPrice,
    maxPrice: this.flySevrice.highestPrice,

    sortType: null,
  }

  _deleteByIndex(arr, i) {
    return [
      ...arr.slice(0, i),
      ...arr.slice(i + 1)
    ];
  }


  onPriceChange = (e) => {
    const target = e.target;
    const id = target.id;
    const value = Number.parseInt(target.value);

    console.log(id, value);

    if (id === 'filter-price-min') {
      this.setState({minPrice: value});
    } else if (id === 'filter-price-max') {
      this.setState({maxPrice: value});
    }
  }

  priceFilter = (flight) => {
    const currentPrice = this.flySevrice.getFlightPrice(flight);

    let { minPrice, maxPrice } = this.state;

    if (maxPrice === 0 || maxPrice < minPrice || isNaN(maxPrice)) {
      maxPrice = Infinity;
    }

    if (isNaN(minPrice)) {
      minPrice = 0;
    }

    return ( currentPrice >= minPrice && currentPrice <= maxPrice );
  };


  onSortingChange = (e) => {
    const target = e.target;
    const value = target.value;;

    this.setState(({ sortType }) => {
      console.log('сортировка: ' + value);
      return { sortType: value }
    });
  }

  sorting = (flights) => {
    if (this.state.sortType === 'hight-to-low') {
      this.flySevrice.sortFlightsByHighestPrice(flights);
    } else if (this.state.sortType === 'low-to-hight') {
      this.flySevrice.sortFlightsByLowestPrice(flights);
    } else if (this.state.sortType === 'by-time') {
      this.flySevrice.sortFlightsByTime(flights);
    }
    return;
  };


  onSegmentsSelector = (e) => {
    const target = e.target;
    const value = target.value;

    this.setState(({ segmentsNumber }) => {
      let newArray = [...segmentsNumber];

      if (target.checked) {
        newArray.push(target.value);
      } else {
        const index = newArray.findIndex((el) => el === value);
        newArray = this._deleteByIndex(newArray, index);
      }
      
      console.log('количество пересадок: ' + newArray);
      return { segmentsNumber: newArray };
    });
  };

  segmentsFilter = (flight) => {
    if (
      this.state.segmentsNumber.length === 0 ||
      this.state.segmentsNumber.length === 2
      ) return true;
    
    let {
      forwardSegmentsNumber, backwardSegmentsNumber
    } = this.flySevrice.getSegmentsInfo(flight);

    const compareValue = forwardSegmentsNumber === backwardSegmentsNumber ? 
      forwardSegmentsNumber : '1';

    return (this.state.segmentsNumber.includes(compareValue) );
  }


  onCarrierSelector = (e) => {
    const target = e.target;
    const value = target.value;

    this.setState(({ selectedCarriers }) => {
      let newArray = [...selectedCarriers];

      if (target.checked) {
        newArray.push(target.value);         
      } else {
        const index = newArray.findIndex((el) => el === value);
        newArray = this._deleteByIndex(newArray, index);
      }

      console.log('список перевозчиков: ' + newArray);
      return { selectedCarriers: newArray };
    })
  };

  сarrierSelectorFilter = (flight) => { 
    if (this.state.selectedCarriers.length === 0) return true;
    const currentUid = this.flySevrice.getCarrierUid(flight);
    return this.state.selectedCarriers.includes(currentUid);
  };


  render() {
    let filteredFlightsList = this.state.flights
      .filter(this.сarrierSelectorFilter)
      .filter(this.segmentsFilter)
      .filter(this.priceFilter);

    this.sorting(filteredFlightsList);

    return (
      <div className='app'>
        <FormSort
          allCarriers={this.state.allCarriers}
          sortType={this.state.sortType}
          onPriceChange={this.onPriceChange}
          onCarrierSelector={this.onCarrierSelector} 
          onSegmentsSelector={this.onSegmentsSelector}
          onSortingChange={this.onSortingChange}
          maxPrice={this.state.maxPrice}
          minPrice={this.state.minPrice}
        />
        <TicketList tickets={filteredFlightsList} />
      </div>
    );
  };
};
