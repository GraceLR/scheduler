import React from "react";
import axios from "axios";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";
import { TRUE } from "sass";

export default function Appointment({id, time, interviewers, interview, bookInterview, cancelInterview}) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const CONFIRMING = "CONFIRMING";
    const DELETING = "DELETING";
    const EDITING = "EDITING";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";
    const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  const save = (name, interviewer, from) => {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    transition(SAVING);
    axios.put('/api/appointments/' + id, {interview})
    .then(() => {
        bookInterview(id, interview, from);
        transition(SHOW);
    })
    .catch(err => {
        transition(ERROR_SAVE, true);
      });
  };
  const onConfirm = id => {
    transition(DELETING, true);
    axios.delete('/api/appointments/' + id)
    .then(() => {
        cancelInterview(id);
        transition(EMPTY);
    })
    .catch(err => {
        transition(ERROR_DELETE, true);
      });
  };
    return(
        <article className="appointment">
            <Header time={time}/>
            {mode === "EMPTY" && <Empty onAdd={() => transition(CREATE)} />}
            {mode === "SHOW" && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(CONFIRMING)} onEdit={() => transition(EDITING)} />}
            {mode === "CREATE" && <Form interviewers={interviewers} onCancel={() => back()} onSave={save} />}
            {mode === "SAVING" && <Status message="Saving"/>}
            {mode === "CONFIRMING" && <Confirm message="Are you sure you would like to delete?" onCancel={() => back()} onConfirm={() => onConfirm(id)} />}
            {mode === "DELETING" && <Status message="Deleting"/>}
            {mode === "EDITING" && <Form studentProp={interview.student} interviewerProp={interview.interviewer} interviewers={interviewers} onCancel={() => back()} onSave={save} />}
            {mode === "ERROR_SAVE" && <Error message="ERROR_SAVE" onClose={() => back()} />}
            {mode === "ERROR_DELETE" && <Error message="ERROR_DELETE" onClose={() => back()} />}
        </article> 
    )
};