import React, { Component } from 'react';
import './app.css';
import FlySevrice from '../../fly-service';

export default class App extends Component {
  
  flySevrice = new FlySevrice();

  state = {
    allCarriers: this.flySevrice.getCarriersWithInfo( this.flySevrice.getAllFlights() ),
    lowestPrice: this.flySevrice.lowestPrice,
    highestPrice: this.flySevrice.highestPrice,

    selectedCarriers: [],

    cityDeparture: '',
    cityArrival: '',


  }

  _deleteByIndex(arr, i) {
    return [
      ...arr.slice(0, i),
      ...arr.slice(i + 1)
    ];
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
      
      console.log(newArray);
      return { selectedCarriers: newArray };
    })
  };


  render() {
    return (
      <SortForm {...this.state} onCarrierSelector={this.onCarrierSelector} />
    );
  };
};



const SortForm = (props) => {
  const { allCarriers, lowestPrice, highestPrice, onCarrierSelector } = props;

  return (
    <form className='form-sort'>
      <PathSelector />
      <PriceFilter lowestPrice={lowestPrice} highestPrice={highestPrice} />
      <SortingSection />
      <TransferFilter />
      <AirlinesSection allCarriers={allCarriers} onCarrierSelector={onCarrierSelector}/>
    </form>
  );
};



const PathSelector = (props) => {
  return (
    <div className="form__section">
      <h3 className='section__name'>Путь</h3>
      <div className='section__group'> 

        <div className='form__select-city'>
          <label className='block' htmlFor='departure-city'>Откуда лететь</label>
            <select className='departure-city' size='1'>
              <option value='MOW'>Москва</option>
              <option value='LED'>САНКТ-ПЕТЕРБУРГ</option>
              <option value='LON'>Лондон</option>
            </select>
        </div>

        <div className='form__select-city'>
          <label className='block' htmlFor='arrival-city'>Куда лететь</label>
            <select className='arrival-city' size='1'>
              <option value='MOW'>Москва</option>
              <option value='LED'>САНКТ-ПЕТЕРБУРГ</option>
              <option value='LON'>Лондон</option>
            </select>
        </div>

      </div>
  </div>
  )
}


const SortingSection = (props) => {
  return (
    <div className="form__section">
      <h3 className='section__name'>Сортировать</h3>
      <div className='section__group'>

        <div className='flex'>
          <input type='radio' name='sort' id='sort-by-increase-price' />
          <label htmlFor='sort-by-increase-price'>по возрастанию цены</label>
        </div>

        <div className='flex'>
          <input type='radio' name='sort' id='sort-by-decrease-price' />
          <label htmlFor='sort-by-decrease-price'>по уменьшению цены</label>
        </div>

        <div className='flex'>
          <input type='radio' name='sort' id='sort-by-time'></input>
          <label htmlFor='sort-by-time'>по времени</label>
        </div> 
    </div>
  </div>
  )
}


const TransferFilter = (props) => {
  return (
    <div className="form__section">
      <h3 className='section__name'>Пересадки</h3>
      <div className='section__group'>
        <div className='flex'>
          <input type='checkbox' name='filter-transfer' id='filter-transfer-0' value="transfer-0"/>
          <label htmlFor='filter-transfer-0'>без пересадок</label>
        </div>

        <div className='flex'>
          <input type='checkbox' name='filter-transfer' id='filter-transfer-1' value="transfer-1"/>
          <label htmlFor='filter-transfer-1'>пересадка</label>
        </div>
      </div>
  </div>
  );
};


const PriceFilter = (props) => {
  const { lowestPrice, highestPrice } = props;
  
  return(
    <div className="form__section">
      <h3 className='section__name'>Цена</h3>
      <div className='section__group'>

        <div className='form__select-city'>
          <label className='block' htmlFor='filter-price-start'>От</label>
          <input type='number' id='filter-price-start' placeholder={lowestPrice}/>
        </div>

        <div className='form__select-city'>
          <label className='block' htmlFor='filter-price-end'>До</label>
          <input type='number' id='filter-price-start' placeholder={highestPrice}/>
        </div>

      </div>
  </div>
  );
};

const AirlinesSection = (props) => {
  let { allCarriers, onCarrierSelector } = props;

  const pairs = Object.entries(allCarriers);

  const createCheckBoxElement = (name, price) => {
    return (
      <div className='carrier-info' key={name}>
        <input 
          type='checkbox' 
          name='filter-carrier' 
          id={`filter-carrier-${name}`} 
          value={name}

          onInput={onCarrierSelector}
        />
        <div>
          <label className='block' htmlFor={`filter-carrier-${name}`}>{`${name}`}
            <br/>
            <span className='carrier-price'>{`от ${price} руб.`}</span>
          </label>
          
        </div>
    </div>
    );
  };

  return (
    <div className="form__section">
      <h3 className='section__name'>Авиакомпании</h3>
        <div className='section__group'>
          { pairs
            .sort((a, b) => a[0] > b[0])
            .map(([name, lowestPrice]) => createCheckBoxElement(name, lowestPrice)) }
        </div>
    </div>
  );
};
