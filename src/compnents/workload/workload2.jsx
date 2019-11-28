import React from "react";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import withDragDropContext from './withDnDContext'
import Data from './Data'




let schedulerData = new SchedulerData(
  '2017-12-18',
  ViewTypes.Week
);
schedulerData.setResources(Data.resources);
schedulerData.setEvents(Data.events);
class Workload extends React.Component {
 state = {
    viewModel: schedulerData
}
  prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(Data.events);
    this.setState({
      viewModel: schedulerData
    });
  };
  
  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(Data.events);
    this.setState({
      viewModel: schedulerData
    });
  };
  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(Data.events);
    this.setState({
        viewModel: schedulerData
    })
}
onViewChange = (schedulerData, view) => {
  schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
  schedulerData.setEvents(Data.events);
  this.setState({
      viewModel: schedulerData
  })
}
  render() {
    return (
      <Scheduler
        schedulerData={this.state.viewModel}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate = {this.onSelectDate}
        onViewChange = {this.onViewChange}
      />
    );
  }
}
export default withDragDropContext(Workload);
