import React, { Component } from 'react';
import FlySevrice from '../../fly-service';
import FormSort from '../form-sort';
import TicketList from '../ticket-list';


import './app.css';

export default class App extends Component {
  
  flySevrice = new FlySevrice();

  state = {
    flights: this.flySevrice.getAllFlights(),
    allCarriers: this.flySevrice.getAllCarriers(),
    filteredCarriers: [],
    lowestPrice: this.flySevrice.lowestPrice,
    highestPrice: this.flySevrice.highestPrice,

    // фильтры
    selectedCarriers: [],
    segmentsNumber: [],
    sortType: '',

    cityDeparture: 'Москва',
    cityArrival: 'Лондон',
  }


  _deleteByIndex(arr, i) {
    return [
      ...arr.slice(0, i),
      ...arr.slice(i + 1)
    ];
  }


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

    if (forwardSegmentsNumber !== backwardSegmentsNumber) return false;

    const compareNumber = String (forwardSegmentsNumber - 1);

    return (this.state.segmentsNumber.includes(compareNumber) );
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

  // update() {
  //   const new
  // }


  render() {
    
    let filteredFlightsList = this.state.flights
      // 
      .filter((el) => { 
        if (this.state.selectedCarriers.length === 0) return true;
        const currentUid = this.flySevrice.getCarrierUid(el);
        return this.state.selectedCarriers.includes(currentUid);
      })
      .filter(this.segmentsFilter);

  //  this.flySevrice.sortFlightsByHighestPrice(filteredFlightsList);

    return (
      <div className='app'>
        <FormSort {...this.state} onCarrierSelector={this.onCarrierSelector} onSegmentsSelector={this.onSegmentsSelector}/>
        <TicketList tickets={filteredFlightsList} />
      </div>
    );
  };
};
