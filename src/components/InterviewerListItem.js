import React from 'react';

import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { avatar, name, selected, setInterviewer } = props;

  return (
    <li
      className={`interviewers__item ${
        selected ? 'interviewers__item--selected' : ''
      }`}
      onClick={setInterviewer}
    >
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected ? name : ''}
    </li>
  );;
}

