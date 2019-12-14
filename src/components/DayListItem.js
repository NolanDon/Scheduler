import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames';

export const formatSpots = (spots) => {
  if (spots === 1) {
    return `${spots} spot remaining`
  } else if (spots > 1) {
    return `${spots} spots remaining`
  } else {
    return `no spots remaining`
  }
};

export default function DayListItem(props) {

  const { selected, setDay } = props;
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": props.spots === 0
  });
  
  return (
    <li className={dayClass} onClick={() => setDay(props.name)} data-testid="day"> 
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}


