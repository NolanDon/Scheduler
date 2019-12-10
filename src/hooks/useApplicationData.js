import { useEffect, useReducer } from 'react';

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTSREMAINING,
  SET_APPOINTMENTS
} from "reducers/application"

 export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const AppId = id => {
    let day = {};
    state.days.forEach(item => {
      item.appointments.forEach(appointmentID => {
        if (id === appointmentID) {
          day = {...item};
        }
      })
    });
    return day; 
  }
  useEffect(() => {
    const days = axios.get("/api/days")
    const appointments = axios.get("/api/appointments")
    const interviewers = axios.get("/api/interviewers")   
    
    Promise.all([days,appointments,interviewers])
    .then((all) => {
      
      const [days, appointments, interviewers] = all;
      dispatch(({ 
        type: SET_APPLICATION_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data }));
      });     
    }, []);

  // change to dispatch
  const setDay = day => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {
    const spotDay = AppId(id)
    const spotIncrease = (spotDay) =>{
      const output = state.days.map((item, index) => {
        if (index !== spotDay.id -1) {
          return item;
        }
        return {
          ...spotDay,
          spots: item.spots - 1
        }
      })
      return output;
    }
    const stateDays = spotIncrease(spotDay)

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(axios.get('/api/days').then(() => dispatch({ type: SET_INTERVIEW, appointments }), dispatch({ type: SET_SPOTSREMAINING, stateDays} )))
  };

  const deleteInterview = function(id) {
    
    const spotDay = AppId(id)
    // console.log('deleteInterview')
    const spotIncrease = (spotDay) =>{
      const output = state.days.map((item, index)=>{
        if (index !== spotDay.id -1){
          return item;
        }
        return {
          ...spotDay,
          spots: item.spots + 1
        }
      })
      return output;
    }

    const stateDays = spotIncrease(spotDay)

    return axios
    .delete(`/api/appointments/${id}`)
    .then(() => {
      const appointments = {...state.appointments}
      appointments[id].interview = null;

      // delete appointments[id];
      // console.log('delete', appointments)
      // console.log('id', id)
      // days
      dispatch({ type: SET_APPOINTMENTS, appointments })
  })
.then(() => dispatch({ type: SET_SPOTSREMAINING, stateDays}));
  }; 
  // console.log('logging state', state)
  return { bookInterview, deleteInterview, state, setDay };
};