  export const SET_DAY = "SET_DAY";
  export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  export const SET_INTERVIEW = "SET_INTERVIEW";
  export const SET_SPOTSREMAINING = "SET_SPOTSREMAINING";
  export const SET_APPOINTMENTS = "SET_APPOINTMENTS";

 export default function reducer(state, action) {
  // console.log('redyucer', action.type, action)
  switch (action.type) {
    case SET_DAY:
      return { ...state, 
        day: action.day };
    case SET_APPLICATION_DATA:
      return {...state, 
        days: action.days, 
        appointments: action.appointments, 
        interviewers: action.interviewers };
    case SET_INTERVIEW: {
      return {...state,
        appointments: action.appointments
      }
    }
    case SET_APPOINTMENTS:
      return {...state, 
         
        appointments: action.appointments, 
      };
    case SET_SPOTSREMAINING: {
      return {...state,
        days: action.stateDays
      }
    }
    default:
    throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
};