import { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, ToolbarProps, View, EventProps } from 'react-big-calendar';
import moment from 'moment';
import { Button, ButtonGroup, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calender.css';

const localizer = momentLocalizer(moment);

const events = [
  { title: 'Event 1', start: new Date(2024, 6, 8, 0, 0), end: new Date(2024, 6, 8, 20, 0) },
  { title: 'Event 2', start: new Date(2024, 6, 10, 0, 0), end: new Date(2024, 6, 10, 20, 0) },
  { title: 'Event 3', start: new Date(2024, 6, 12, 0, 0), end: new Date(2024, 6, 12, 20, 0) },
  { title: 'Event 4', start: new Date(2024, 6, 25, 0, 0), end: new Date(2024, 6, 25, 20, 0) },
  { title: 'Event 5', start: new Date(2024, 6, 7, 0, 0), end: new Date(2024, 6, 7, 20, 0) },
  { title: 'Event 6', start: new Date(2024, 0, 28, 0, 0), end: new Date(2024, 0, 28, 20, 0) },
];

interface CustomEventProps extends EventProps<any> {
  view: View;
}

function CustomEvent({ event, view }: CustomEventProps) {
  const eventDay = moment(event.start).day();
  const isSunday = eventDay === 0;
  const duration = moment(event.end).diff(moment(event.start), 'hours');
  const startTime = moment(event.start).format('HH:mm');

  console.log(`Event: ${event.title}, Date: ${moment(event.start).format('YYYY-MM-DD')}, Day: ${eventDay}, isSunday: ${isSunday}`);

  if (isSunday) {
    return (
      <div className="custom-event" style={{ color: 'black', backgroundColor:'white', padding: '5px', borderRadius: '5px' }}>
        <Typography variant="body2">Blocked-</Typography>
      </div>
    );
  }

  if (view === 'week') {
    return (
      <div className="custom-event" style={{ color: 'black', backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
        <Typography variant="body2">Hours Available:</Typography>
        <Typography sx={{fontWeight:"bold"}} variant="body1">{duration}</Typography>
        <Typography variant="body2">Started:</Typography>
        <Typography sx={{fontWeight:"bold"}} variant="body1">{startTime}</Typography>
      </div>
    );
  } else {
    return (
      <div className="custom-event" style={{ color: 'black', backgroundColor: '#f5f5f5', padding: '4px', borderRadius: '5px' }}>
        <div style={{display:'flex' ,alignItems:'center'}}>Hrs:    <Typography sx={{fontWeight:"bold"}} variant="body1">{duration}</Typography> </div>
        <div style={{display:'flex' ,alignItems:'center'}}>Started:    <Typography sx={{fontWeight:"bold"}} variant="body1">{startTime}</Typography> </div>
      </div>
    );
  }
}


function CustomToolbar({ label, onNavigate, onView }: ToolbarProps) {
  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    onNavigate(action);
  };

  const handleViewChange = (newView: View) => {
    onView(newView);
  };

  return (
    <div className="fc-toolbar" style={{ marginBottom: "12px" }}>
      <div className="fc-toolbar-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ArrowBackIosNewIcon
          sx={{ color: 'grey' }}
          className="icon"
          onClick={() => handleNavigate('PREV')}
        />
        <span style={{ margin: '0 10px', color: 'grey', fontSize: "23px", fontWeight: 'bold' }}>{label}</span>
        <ArrowForwardIosIcon
          sx={{ color: 'grey' }}
          className="icon"
          onClick={() => handleNavigate('NEXT')}
        />
        <Button
          sx={{ marginLeft: 38, color: '#673ab7', textTransform: 'initial', border: '1px solid #673ab7', borderRadius: 3 }}
          onClick={() => handleNavigate('TODAY')}
        >
          Today
        </Button>
        <ButtonGroup>
          <Button
            sx={{ color: '#673ab7', textTransform: 'initial', border: '1px solid #673ab7', borderRadius: 3 }}
            onClick={() => handleViewChange('week')}
          >
            Week
          </Button>
          <Button
            sx={{ color: '#673ab7', textTransform: 'initial', border: '1px solid #673ab7', borderRadius: 3 }}
            onClick={() => handleViewChange('month')}
          >
            Month
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default function CustomCalendar() {
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (

    <div className="custom-calendar-wrapper">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week']}
        view={view}
        date={date}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        components={{
          toolbar: CustomToolbar,
          event: (props: EventProps<any>) => <CustomEvent {...props} view={view} />
        }}
        style={{ height: 500, margin: '12px' }}
      />
    </div>
    
  );
}
