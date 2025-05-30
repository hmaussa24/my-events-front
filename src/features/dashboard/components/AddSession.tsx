import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventApi } from '@fullcalendar/core'
import { INITIAL_EVENTS, createEventId } from './event-utils'
interface EventClickInfo {
    event: {
        title: string;
        remove: () => void;
    };
}

interface DateSelectInfo {
    view: {
        calendar: {
            unselect: () => void;
            addEvent: (event: {
                id: string;
                title: string;
                start: string;
                end: string;
                allDay: boolean;
            }) => void;
        };
    };
    startStr: string;
    endStr: string;
    allDay: boolean;
}

interface CalendarEvent {
    id: string;
    title: string;
    start: string | Date;
    end?: string | Date;
    allDay?: boolean;
}
export default function SessionCalendar() {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
  
    const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([])




function handleDateSelect(selectInfo: DateSelectInfo) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
        calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        })
    }
}



function handleEventClick(clickInfo: EventClickInfo) {
    // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
}

function handleEvents(events: EventApi[]) {
    setCurrentEvents(
        events.map(event => ({
            id: event.id,
            title: event.title,
            start: event.start ? event.start.toISOString() : '',
            end: event.end ? event.end.toISOString() : undefined,
            allDay: event.allDay
        }))
    )
}

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='timeGridWeek'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
    </div>
  )
}

function renderEventContent(eventInfo: { timeText: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; event: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined } }) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
