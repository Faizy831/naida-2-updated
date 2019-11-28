import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 2, 29, 13, 0, 0),
    resourceId: 1
  },
  {
    id: 1,
    title: "MS training",
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 1, 29, 16, 30, 0),
    resourceId: 2
  },
  {
    id: 2,
    title: "Team lead meeting",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 5, 29, 12, 30, 0),
    resourceId: 3
  },
  {
    id: 3,
    title: "Birthday Party",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 7, 30, 10, 30, 0),
    resourceId: 4
  }
];

const resourceMap = [
  { resourceId: 1, resourceTitle: "Board room" },
  { resourceId: 2, resourceTitle: "Training room" },
  { resourceId: 3, resourceTitle: "Meeting room 1" },
  { resourceId: 4, resourceTitle: "Meeting room 2" }
];

let Resource = ({}) => (
  <Calendar
    events={events}
    localizer={localizer}
    defaultView={"day"}
    views={["day", "agenda", "month"]}
    step={60}
    defaultDate={new Date(2018, 0, 29)}
    resources={resourceMap}
    resourceIdAccessor="resourceId"
    resourceTitleAccessor="resourceTitle"
  />
);

export default Resource;
