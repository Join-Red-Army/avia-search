import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import flights from './flights.json';
import dummy from './dummy.json';
import FlySevrice from './fly-service';

const obj = flights.result.flights;

const aeroflot = obj.filter((el) => {
  const company = el.flight.carrier.caption;
  if (company === 'Аэрофлот - российские авиалинии') return true;
});


// console.log(flights.result)

const flySevrice = new FlySevrice();

// console.log(flySevrice.getAllCarriers());

// console.log(flySevrice.getLowestPrice(flySevrice.getAllFlights()))

ReactDOM.render(
  <App />,
  document.getElementById('root')
);