import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  const bookInterview = (id, interview, from) => {
    const days = [...state.days].map((day) => {
      if (day.appointments.includes(id) && from === "CREATE") {
        day.spots--;
      }
      return day;
    });
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };
    setState((prev) => ({ ...prev, days: days, appointments: appointments }));
  };
  const cancelInterview = (id) => {
    const daysNew = [...state.days].map((day) => {
      if (day.appointments.includes(id)) {
        day.spots++;
      }
      return day;
    });
    let appointmentsnew = { ...state.appointments };
    appointmentsnew[id].interview = null;
    setState((prev) => ({
      ...prev,
      days: daysNew,
      appointments: appointmentsnew,
    }));
  };
  return {
    state: state,
    setState,
    bookInterview,
    cancelInterview,
  };
}
