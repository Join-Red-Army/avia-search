import flights from './flights.json';

export default class FlySevrice {

  // Flights
  allFlights = flights.result.flights.map(({ flight }) => flight);
  getAllFlights = () => this.allFlights;


  // Carriers
  allCarriers = Array.from(
    this.allFlights.reduce(
      (acc, carrier) => acc.add( this.getCarrierName(carrier)),
      new Set())
  );

  getAllCarriers = () => this.allCarriers;

  getCarrierName({ carrier }) {
    return carrier.caption
  };

  getCarrierPrice({ price }) {
    return Number.parseFloat(price.totalFeeAndTaxes.amount);
  };

  getCarriersWithInfo = (arr) => {
    const namesAndPrices = {};

    arr.forEach((flight) => {
      let carrierName = this.getCarrierName(flight);
      if (carrierName.length > 27) {
        carrierName = carrierName.slice(0, 27) + '…';
      }
      const currentPrice = this.getCarrierPrice(flight);

      if (!namesAndPrices.hasOwnProperty(carrierName)) {
        namesAndPrices[carrierName] = currentPrice;
      } else if (currentPrice <= namesAndPrices[carrierName] ) {
        namesAndPrices[carrierName] = currentPrice;
      } else {
        return;
      };
    });
    return namesAndPrices
  };
  


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