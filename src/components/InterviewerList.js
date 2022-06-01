import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList({interviewers, value, onChange}){
    const InterviewerListItems = interviewers.map(interviewer => {
      return (
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={value === interviewer.id}
          setInterviewer={() => onChange(interviewer)} />)
      });

    return(
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
                {InterviewerListItems}
            </ul>
        </section>
    )
  }