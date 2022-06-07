import React from "react";
import axios from "axios";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

export default function Appointment({id, time, interviewers, interview, bookInterview}) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    bookInterview(id, interview);
    transition(SAVING);
    axios.put('/api/appointments/' + id, {interview})
    .then(() => transition(SHOW));
  };
    return(
        <article className="appointment">
            <Header time={time}/>
            {mode === "EMPTY" && <Empty onAdd={() => transition(CREATE)} />}
            {mode === "SHOW" && <Show student={interview.student} interviewer={interview.interviewer} />}
            {mode === "CREATE" && <Form interviewers={interviewers} onCancel={() => back()} onSave={save}/>}
            {mode === "SAVING" && <Status message="Saving"/>}
        </article> 
    )
};