import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem({ selected, spots, setDay, name }) {
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });
  const formatSpots = (spotsRemaining) => {
    if (spotsRemaining === 0) {
      return "no spots remaining";
    } else if (spotsRemaining === 1) {
      return "1 spot remaining";
    } else {
      return spotsRemaining + " spots remaining";
    }
  };
  return (
    <li
      className={dayListItemClass}
      data-testid="day"
      onClick={() => setDay(name)}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
