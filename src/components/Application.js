import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import "components/Application.scss";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);
  const bookInterview = (id, interview, from) => {
    const days = [...state.days].map(day => {
      if (day.appointments.includes(id) && from === 'EDITING') {
        day.spots--;
      }
      return day;
    });
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};
    setState(prev => ({...prev, days: days, appointments: appointments}));
  };
  const cancelInterview = id => {
    const daysNew = [...state.days].map(day => {
      if (day.appointments.includes(id)) {
        day.spots++;
      }
      return day;
    });
    let appointmentsnew = {...state.appointments};
    appointmentsnew[id].interview = null;
    setState(prev => ({...prev, days: daysNew, appointments: appointmentsnew}));
  };
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interviewers={interviewers}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={newDay => setState(prev => ({...prev, day: newDay}))}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
