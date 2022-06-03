export function getAppointmentsForDay(state, day) {
    const eachDay = state.days.filter(eachDay => eachDay.name === day);
    if (eachDay.length === 0) {
        return [];
    }
    const appointments = eachDay[0].appointments;
    return appointments.map(appointmentid => state['appointments'][appointmentid]);
  };

export function getInterview(state, interview) {
    if (!interview) {
        return null;
    }
    const interviewerId = interview.interviewer;
    return {...interview, interviewer: state.interviewers[interviewerId]};
};
