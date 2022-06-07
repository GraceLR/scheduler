import React from "react";
import axios from "axios";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";

export default function Appointment({id, time, interviewers, interview, bookInterview, cancelInterview}) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const CONFIRMING = "CONFIRMING";
    const DELETING = "DELETING";
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
  const onCancel = () => {
      back();
  }
  const onDelete = () => {
    transition(CONFIRMING);
  };
  const onConfirm = id => {
    cancelInterview(id);
    transition(DELETING);
    axios.delete('/api/appointments/' + id)
    .then(() => transition(EMPTY));
  };
    return(
        <article className="appointment">
            <Header time={time}/>
            {mode === "EMPTY" && <Empty onAdd={() => transition(CREATE)} />}
            {mode === "SHOW" && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => onDelete()} />}
            {mode === "CREATE" && <Form interviewers={interviewers} onCancel={() => back()} onSave={save}/>}
            {mode === "SAVING" && <Status message="Saving"/>}
            {mode === "CONFIRMING" && <Confirm message="Are you sure you would like to delete?" onCancel={() => onCancel()} onConfirm={() => onConfirm(id)} />}
            {mode === "DELETING" && <Status message="Deleting"/>}
            {/* {mode === "DELETING" && <Status message="DELETING"/>} */}
        </article> 
    )
};