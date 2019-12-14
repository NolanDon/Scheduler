export const getAppointmentsForDay = (state, day) => {
  let appointment = [];
  let compare = []
  const days = state.days.filter(e => e.name === day);
  if (days.length > 0) {
    compare = days[0].appointments
  }
  compare.forEach(e => {
    if (e === state.appointments[e].id) {
      appointment.push(state.appointments[e])
    }; 
  });
  return appointment;
};
 
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    const interviewObj = { student, interviewer };
    return interviewObj;
  };
};

export const getInterviewersForDay = function(state, day) {
  let interviewers = [];
  let compare = []
  const days = state.days.filter(e => e.name === day);
  if (days.length > 0) {
    compare = days[0].interviewers
  }
  compare.forEach(e => {
   if (e === state.interviewers[e].id) {
     interviewers.push(state.interviewers[e])
   };
  });
  return interviewers;
 };


