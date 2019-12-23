import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const { days, setDay, day } = props;
 
  const dayList = days.map(dayListItem => (
    <DayListItem
      key={dayListItem.id}
      name={dayListItem.name}
      day={dayListItem}
      selected={dayListItem.name === day}
      setDay={setDay}
      spots={dayListItem.spots}
    />
  ));

  return <ul id={dayList}>{dayList}</ul>;
};



