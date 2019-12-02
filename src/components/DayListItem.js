import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames';
// import { getMaxListeners } from "cluster";

export default function DayListItem(props) {

  const { day, selected, setDay } = props;
  
  // console.log('prop spot in DayList :', props)

  const formatSpots = () => {
    if (day.spots === 1) {
      return `${day.spots} spot remaining`
    } else if (day.spots > 1) {
      return `${day.spots} spots remaining`
    } else {
      return `no spots remaining`
    }
  };
  
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": day.spots === 0
  });
  
  return (
    <li className={dayClass} onClick={() => setDay(props.name)} data-testid="day"> 
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}


