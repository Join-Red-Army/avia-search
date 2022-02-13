import flights from './flights.json';

export default class FlySevrice {

  // Flights
  allFlights = flights.result.flights.map(({ flight }) => flight);
  getAllFlights = () => this.allFlights;
  getAllCarriers = () => this.getCarriersFromArray(this.allFlights);


  // геттеры
  getCarrierName({ carrier }) {
    return carrier.caption
  };

  getCarrierUid({ carrier }) {
    return carrier.uid;
  };

  getFlightPrice({ price }) {
    return Number.parseFloat(price.totalFeeAndTaxes.amount);
  };

  getTicketTime(str) {
    let date = new Date(str);

    let hours = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`
  };

  getTicketDate(str) {
    let date = new Date(str);

    const monthName = [
      'янв.', 'фев.', 'мар.', 'апр.', 'май', 'июн.', 
      'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'
    ];
    const weekDayName = [
      'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'
    ];

    const weekDay = weekDayName[date.getDay()];
    const month = monthName[date.getMonth()];
    const monthDay = date.getDate();

    return `${monthDay} ${month} ${weekDay}`;
  };


  getSegmentsInfo({legs}) {
    const [legForward, legBackward] = legs;
    
    const forwardSegments = legForward.segments;
    const forwardSegmentsNumber = String(forwardSegments.length - 1);
    const forwardSegmentsDuration = legForward.duration;

    const backwardSegments = legBackward.segments;
    const backwardSegmentsNumber = String(backwardSegments.length - 1);
    const backwardSegmentsDuration = legBackward.duration;

    const completeTime = forwardSegmentsDuration + backwardSegmentsDuration

    return {
      forwardSegmentsNumber, forwardSegmentsDuration,
      backwardSegmentsNumber, backwardSegmentsDuration, completeTime
    };

  }


  getFullFlightInfo = (flight) => {

    // вспомогательные функции
    const getAirline = (segments) => {
      const firstSegment = segments[0];
      if (firstSegment.hasOwnProperty('operatingAirline')) {
        return firstSegment.operatingAirline.caption;
      }
      return firstSegment.airline.caption;
    };

    const getReadableTime = (num) => {
      const hours = Math.floor(num / 60);
      const minutes = num % 60;
      return `${hours} ч ${minutes} мин`;
    };

    const getDepartureInfo = (segments) => {
      const firstSegment = segments[0];
      const lastSegment = segments[segments.length - 1];
      const result = {};
      

      // В базе данных ошибка: в 7 полётах не указаны города
      if (!firstSegment.hasOwnProperty('departureCity')) {
        result.departureCity = 'ЛОНДОН';
      } else {
        result.departureCity = firstSegment.departureCity.caption;
      }
      result.departureAirport = firstSegment.departureAirport.caption;
      result.departureAirportUid = firstSegment.departureAirport.uid;
      result.departureDate = firstSegment.departureDate;

      if (!lastSegment.hasOwnProperty('arrivalCity')) {
        result.arrivalCity = 'ЛОНДОН';
      } else {
        result.arrivalCity = lastSegment.arrivalCity.caption;
      }
      result.arrivalAirport = lastSegment.arrivalAirport.caption;
      result.arrivalAirportUid = lastSegment.arrivalAirport.uid;
      result.arrivalDate = lastSegment.arrivalDate;

      return result;
    };


    // общая информация о полёте
    const carrierName = this.getCarrierName(flight);
    const carrierUid = this.getCarrierUid(flight);
    const flightPrice = this.getFlightPrice(flight);


    // детальная информация о сегментах
    const [legForward, legBackward] = flight.legs;


    // туда
    const forwardSegments = legForward.segments;
    // const forwardSegmentsNumber = forwardSegments.length;
    const forwardSegmentsNumber = forwardSegments.length > 1 ?
      '1 пересадка' : 'без пересадок';
    const forwardAirline = getAirline(forwardSegments);
    const forwardSegmentsDuration = getReadableTime(legForward.duration);

    const forwardDepartureArivalInfo = getDepartureInfo(forwardSegments);
    const forwardDepartureCity = forwardDepartureArivalInfo.departureCity;
    const forwardDepartureAirport = forwardDepartureArivalInfo.departureAirport; 
    const forwardDepartureAirportUid = forwardDepartureArivalInfo.departureAirportUid; 
    const forwardDepartureDate = forwardDepartureArivalInfo.departureDate;

    const forwardArrivalCity = forwardDepartureArivalInfo.arrivalCity;
    const forwardArrivalAirport = forwardDepartureArivalInfo.arrivalAirport; 
    const forwardArrivalAirportUid = forwardDepartureArivalInfo.arrivalAirportUid; 
    const forwardArrivalDate = forwardDepartureArivalInfo.arrivalDate;


    // обратно
    const backwardSegments = legBackward.segments;
    const backwardSegmentsNumber = backwardSegments.length > 1 ?
    '1 пересадка' : 'без пересадок';;
    const backwardAirline = getAirline(backwardSegments);
    const backwardSegmentsDuration = getReadableTime(legBackward.duration);

    const backwardDepartureArivalInfo = getDepartureInfo(backwardSegments);
    const backwardDepartureCity = backwardDepartureArivalInfo.departureCity;
    const backwardDepartureAirport = backwardDepartureArivalInfo.departureAirport; 
    const backwardDepartureAirportUid = backwardDepartureArivalInfo.departureAirportUid; 
    const backwardDepartureDate = backwardDepartureArivalInfo.departureDate;

    const backwardArrivalCity = backwardDepartureArivalInfo.arrivalCity;
    const backwardArrivalAirport = backwardDepartureArivalInfo.arrivalAirport; 
    const backwardArrivalAirportUid = backwardDepartureArivalInfo.arrivalAirportUid; 
    const backwardArrivalDate = backwardDepartureArivalInfo.arrivalDate;

    return {
      carrierName, carrierUid, flightPrice,

      forwardSegmentsNumber, forwardAirline, forwardSegmentsDuration,
      forwardDepartureCity, forwardDepartureAirport, forwardDepartureAirportUid, forwardDepartureDate,
      forwardArrivalCity, forwardArrivalAirport, forwardArrivalAirportUid, forwardArrivalDate,

      backwardSegmentsNumber, backwardAirline, backwardSegmentsDuration,
      backwardDepartureCity, backwardDepartureAirport, backwardDepartureAirportUid, backwardDepartureDate,
      backwardArrivalCity, backwardArrivalAirport, backwardArrivalAirportUid, backwardArrivalDate,
    };
  };


  // сортировки
  sortFlightsByHighestPrice = (arr) => {
    arr.sort((a, b) => {
      return this.getFlightPrice(b) - this.getFlightPrice(a);
    });
  };

  sortFlightsByLowestPrice = (arr) => {
    arr.sort((a, b) => {
      return (this.getFlightPrice(b) - this.getFlightPrice(a)) * -1;
    });
  };

  sortFlightsByTime = (arr) => {
    arr.sort((a, b) => {
      return (
        (this.getSegmentsInfo(a).completeTime - this.getSegmentsInfo(b).completeTime)
      );
    });
  }

  
  _createShortName(str) {
    return str.length > 27 ? 
      str.slice(0, 27) + '…' : str;
  };

  getCarriersFromArray = (arr) => {
    const data = {};

    arr.forEach((flight) => {
      const carrierName = this.getCarrierName(flight);
      const currentPrice = this.getFlightPrice(flight);

      if (!data.hasOwnProperty(carrierName)) {
        data[carrierName] = {
          carrierName,
          carrierShortName: this._createShortName(carrierName),
          carrierLowestPrice: currentPrice,
          carrierUid: this.getCarrierUid(flight)};

        } else if (currentPrice <= data[carrierName].carrierLowestPrice) {
          data[carrierName].carrierLowestPrice = currentPrice;
        }
        return;
    });

    return Object.values(data);
  }


  // Prices 
  lowestPrice = this.getLowestPrice(this.allFlights);
  highestPrice = this.getHighestPrice(this.allFlights);

  getLowestPrice(arr) {
    return arr.reduce((acc, {price}) => {
      const currentPrice = Number.parseFloat(price.totalFeeAndTaxes.amount);
      return acc < currentPrice ? acc : currentPrice;
    });
  };

  getHighestPrice(arr) {
    return arr.reduce((acc, {price}) => {
      const currentPrice = Number.parseFloat(price.totalFeeAndTaxes.amount);
      return acc > currentPrice ? acc : currentPrice;
    });
  }

}