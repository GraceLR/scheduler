import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form({
  studentProp,
  interviewers,
  interviewerProp,
  onCancel,
  onSave,
}) {
  const [student, setStudent] = useState(studentProp || "");
  const [interviewer, setInterviewer] = useState(interviewerProp || null);
  const [error, setError] = useState("");
  const from = studentProp ? "EDITING" : "CREATE";
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    onCancel();
  };
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer, from);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          {error && (
            <section className="appointment__validation">{error}</section>
          )}
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer ? interviewer.id : null}
          onChange={(selectedInterviewer) => {
            setInterviewer(selectedInterviewer);
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
