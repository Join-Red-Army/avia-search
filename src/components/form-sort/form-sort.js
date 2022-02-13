import React from 'react';
import './form-sort.css';

const FormSort = (props) => {
  const { 
    allCarriers, lowestPrice, highestPrice, sortType,
    onCarrierSelector, onSegmentsSelector, onSortingChange,
    onPriceChange, maxPrice, minPrice } = props;

  return (
    <form className='form-sort'>
      
      <PriceInputs 
        lowestPrice={lowestPrice} 
        highestPrice={highestPrice} 
        onPriceChange={onPriceChange}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
      
      <SortingSection 
        onSortingChange={onSortingChange} 
        sortType={sortType}
      />
      
      <SegmentsFilter 
        onSegmentsSelector={onSegmentsSelector}
      />
      
      <AirlinesSection 
        allCarriers={allCarriers} 
        onCarrierSelector={onCarrierSelector}
      />
    </form>
  );
};

export default FormSort;


// Ниже расположены элементы формы

const SortingSection = (props) => {
  const { onSortingChange, sortType } = props;

  const btnNames = [
    { name: 'по возрастанию цены', value: 'low-to-hight'}, 
    { name: 'по убыванию цены', value: 'hight-to-low' },
    { name: 'по времени', value: 'by-time' }
  ];

  const CreateRadioElement = ({btnName, value}) => {
    const kebabName = btnName.split(' ').join('-');

    return (
      <div className='flex'>
        <input 
          type='radio' 
          name='sort'
          id={`sort-${kebabName}`}
          value={value}
          onChange={onSortingChange}
          checked={value === sortType}
        />
        <label htmlFor={`sort-${kebabName}`}>
          {btnName}
        </label>
    </div>
    )
  };

  return (
    <div className="form__section">
      <h3 className='section__name'>Сортировать</h3>
        <div className='section__group'>
          {
            btnNames.map(({name, value}, id) => <CreateRadioElement btnName={name} value={value} key={id} />)
          }
        </div>
    </div>
  );
};


const SegmentsFilter = (props) => {
  const {onSegmentsSelector} = props;

  return (
    <div className="form__section">
      <h3 className='section__name'>Пересадки</h3>
      <div className='section__group'>
        <div className='flex'>
          <input 
            type='checkbox' 
            name='filter-transfer' 
            id='filter-transfer-0' 
            value="0"
            onInput={onSegmentsSelector}
          />
          <label htmlFor='filter-transfer-0'>без пересадок</label>
        </div>

        <div className='flex'>
          <input 
            type='checkbox' 
            name='filter-transfer' 
            id='filter-transfer-1' 
            value="1"
            onInput={onSegmentsSelector}
          />
          <label htmlFor='filter-transfer-1'>1 пересадка</label>
        </div>
      </div>
  </div>
  );
};


const PriceInputs = (props) => {
  const { 
    lowestPrice, highestPrice, 
    onPriceChange, maxPrice, minPrice } = props;
  
  return(
    <div className="form__section">
      <h3 className='section__name'>Цена</h3>
      <div className='section__group'>

        <div className='form__select-city'>
          <label className='block' htmlFor='filter-price-min'>От</label>
          <input 
            type='number' 
            id='filter-price-min' 
            placeholder={lowestPrice}
            onChange={onPriceChange}
            value={minPrice}
          />
        </div>

        <div className='form__select-city'>
          <label className='block' htmlFor='filter-price-max'>До</label>
          <input 
            type='number'
            id='filter-price-max' 
            placeholder={highestPrice}
            value={maxPrice}
            onChange={onPriceChange}
          />
        </div>

      </div>
  </div>
  );
};


const AirlinesSection = (props) => {
  const { allCarriers, onCarrierSelector } = props;

  const createCheckBoxElement = ({
      carrierName, carrierShortName, carrierUid, carrierLowestPrice}) => {
    return (
      <div className='carrier-info' key={carrierName}>
        <input 
          type='checkbox' 
          name='filter-carrier' 
          id={`filter-carrier-${carrierUid}`} 
          value={carrierUid}

          onInput={onCarrierSelector}
        />
        <div>
          <label className='block' htmlFor={`filter-carrier-${carrierUid}`}>
            {`${carrierShortName}`}
            <br/>
            <span className='carrier-price'>
              {`от ${carrierLowestPrice} руб.`}
            </span>
          </label>
          
        </div>
    </div>
    );
  };

  return (
    <div className="form__section">
      <h3 className='section__name'>Авиакомпании</h3>
        <div className='section__group'>
          { allCarriers
            .sort((a, b) => a.carrierName > b.carrierName)
            .map((carrier) => createCheckBoxElement({...carrier})) }
        </div>
    </div>
  );
};