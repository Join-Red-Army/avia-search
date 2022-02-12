import React from 'react';
import Ticket from '../ticket';
import FlySevrice from '../../fly-service';
import './ticket-list.css';

const flySevrice = new FlySevrice();

const TicketList = (props) => {
  const {tickets} = props;
  
  return (
    <div className='ticket-list'>
      <ul>
        {
          tickets.map( (flight, id) => {

            const ticketProps = {
              ...flySevrice.getFullFlightInfo(flight), key: id
            };

            return <Ticket {...ticketProps}/>
          })
        }
      </ul>
    </div>
  );

};

export default TicketList;