import React, { useEffect } from "react";
import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';

import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Confirm from './Confirm';
import Error from './Error';
import Form from './Form';
import Status from './Status';


export default function Appointment(props) {
 
  const {
      interview,
      time,
      editInterview,
      bookInterview,
      deleteInterview,
      id,
      interviewers = [],
    } = props;
   
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CONFIRM = "CONFIRM";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const EDIT = "EDIT";
    const DELETING = "DELETING";
    const ERROR_DELETE = "ERROR_DELETE";
    const ERROR_SAVE = "ERROR_SAVE"; 
    
    const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

    useEffect(() => {
      if (interview && mode === EMPTY) {
        transition(SHOW);
      }
      if (interview === null && mode === SHOW) {
        transition(EMPTY);
      }
    }, [interview, transition, mode]);
  
    // saving appointment function
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING, true)
      bookInterview(id, interview)
      .then(() => 
        transition(SHOW))
      .catch(() => 
        transition(ERROR_SAVE, true));
    };
    
    // edit interview
    function edit(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING, true)
      editInterview(id, interview)
      .then(() => 
        transition(SHOW))
      .catch(() => 
        transition(ERROR_SAVE, true));
    };
      // remove appointment function
    function remove() {
    
      transition(DELETING, true)
      deleteInterview(id)
      .then(() => {transition(EMPTY) 
      }).catch(() => {
        transition(ERROR_DELETE, true)
      })
    }; 
         
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back(SHOW)}
          onConfirm={remove}
          message="Are you sure you want to delete your appointment?"
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
         <Form
         name={interview.student}
         interviewer={interview.interviewer.id}
         interviewers={interviewers}
         onSave={edit}
         onCancel={() => back()}
       />
      )}
      {(mode === EMPTY || mode === SHOW) && !interview && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => transition(EMPTY)} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {(mode === EMPTY || mode === SHOW) && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
    </article>
  );
}