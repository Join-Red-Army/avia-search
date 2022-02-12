import React from 'react';
import FlySevrice from '../../fly-service';
import ImgService from '../../img-service';
import './ticket.css';

const imgService = new ImgService();
const flySevrice = new FlySevrice();

const Ticket = (props) => {
  const {
    carrierName, carrierUid, flightPrice,

    forwardSegmentsNumber, forwardAirline, forwardSegmentsDuration,
    forwardDepartureCity, forwardDepartureAirport, forwardDepartureAirportUid, forwardDepartureDate,
    forwardArrivalCity, forwardArrivalAirport, forwardArrivalAirportUid, forwardArrivalDate,
    backwardSegmentsNumber, backwardAirline, backwardSegmentsDuration,

    backwardDepartureCity, backwardDepartureAirport, backwardDepartureAirportUid, backwardDepartureDate,
    backwardArrivalCity, backwardArrivalAirport, backwardArrivalAirportUid, backwardArrivalDate,
  } = props;


  return (
    <div className='ticket'>

      <header className='ticket__header'>
        <img className='header__carrier-logo' src={imgService.getImg(carrierUid)} />
        <div className='header__info-box'>
          <span className='header__info-price'>{flightPrice} ₽</span>
          <span className='header__info-type'>Стоимость для одного взрослого пассажира</span>
        </div>
      </header>

      <div className='ticket__content'>

        {/* секция forward */}
        <div className='section'>

          {/* path */}
          <div className='section__path'>
            <span>{`${forwardDepartureCity}, ${forwardDepartureAirport}`}</span>
            <span className='path__uid'>{` (${forwardDepartureAirportUid}) → `}</span>
            <span>{`${forwardArrivalCity}, ${forwardArrivalAirport}`}</span>
            <span className='path__uid'>{` (${forwardArrivalAirportUid})`}</span>
          </div>


          {/* time */}
          <div className='section__time'>
            <div>
              <span className='time__ticket-time'>{`${flySevrice.getTicketTime(forwardDepartureDate)} `}</span>
              <span className='time__ticket-date'>{`${flySevrice.getTicketDate(forwardDepartureDate)}`}</span>
            </div>

            <div> {/* сюда иконку часов */}
              <span>{forwardSegmentsDuration}</span>
            </div>

            <div>
              <span className='time__ticket-date'>
                {`${flySevrice.getTicketDate(forwardArrivalDate)} `}
              </span>
              <span className='time__ticket-time'>
                {flySevrice.getTicketTime(forwardArrivalDate)}
              </span>
            </div>
          </div>


          {/* segments */}
          <div className='section__segments'>
            <span>{forwardSegmentsNumber}</span>
          </div>


          {/* Carrier */}
          <div className='section__carrier'>
            <span>Рейс выполняет: {forwardAirline}</span>
          </div>
            
        </div> {/* конец секции */}


        <hr className='section__line'/>


        {/* секция backward */}
        <div className='section'>

          {/* path */}
          <div className='section__path'>
            <span>{`${backwardDepartureCity}, ${backwardDepartureAirport}`}</span>
            <span className='path__uid'>{` (${backwardDepartureAirportUid}) → `}</span>
            <span>{`${backwardArrivalCity}, ${backwardArrivalAirport}`}</span>
            <span className='path__uid'>{` (${backwardArrivalAirportUid})`}</span>
          </div>


          {/* time */}
          <div className='section__time'>
            <div>
              <span className='time__ticket-time'>{`${flySevrice.getTicketTime(backwardDepartureDate)} `}</span>
              <span className='time__ticket-date'>{`${flySevrice.getTicketDate(backwardDepartureDate)}`}</span>
            </div>

            <div> {/* сюда иконку часов */}
              <span>{backwardSegmentsDuration}</span>
            </div>

            <div>
              <span className='time__ticket-date'>
                {`${flySevrice.getTicketDate(backwardArrivalDate)} `}
              </span>
              <span className='time__ticket-time'>
                {flySevrice.getTicketTime(backwardArrivalDate)}
              </span>
            </div>
          </div>


          {/* segments */}
          <div className='section__segments'>
            <span>{backwardSegmentsNumber}</span>
          </div>


          {/* Carrier */}
          <div className='section__carrier'>
            <span>Рейс выполняет: {backwardAirline}</span>
          </div>
            
          </div>
      </div> {/* конец секции */}

      <button 
        className='section__orange-btn' 
        type='button'
        onClick={() => alert(`Выбран билет компании ${carrierName}`)}>
          ВЫБРАТЬ
      </button>

    </div>
  )
};

export default Ticket;
