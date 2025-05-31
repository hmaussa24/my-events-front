import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useParams } from 'react-router-dom'
import ModalAddSession from "./ModalAddSession";
import { getSessions } from "../services/eventosDashboardService";

interface EventClickInfo {
    event: {
        title: string;
        start: Date | null;
        end: Date | null;
        allDay: boolean;
        id: string;
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
export default function SessionCalendar() {
  const { eventId } = useParams<{ eventId: string }>();
  const [weekendsVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<{start: string, end: string, allDay: boolean}>();
  const calendarRef = React.useRef<any>(null);

const removeAllEvents = () => {
    if (calendarRef.current) {
        const api = calendarRef.current.getApi();
        api.removeAllEvents();
    }
}

  React.useEffect(() => {
    if (!eventId) return;
    getSessions(Number(eventId)).then(sessions => {
      if (!sessions || sessions.length === 0) {
        removeAllEvents();
        return;
      }
      const mapped = sessions.map(session => ({
        id: String(session.id),
        title: session.name,
        start: session.start_time,
        end: session.end_time,
        allDay: false
      }));
      removeAllEvents();
      mapped.forEach(ev => calendarRef.current.getApi().addEvent(ev));
    }).catch(() => {
      removeAllEvents();
    });
  }, [eventId]);

  function handleDateSelect(selectInfo: DateSelectInfo) {
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    setModalInfo({
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
    });
    setModalOpen(true);
}

  function handleSessionCreated(session: { id: string; title: string; start: string; end: string; allDay: boolean }) {
    if (calendarRef.current) {
      calendarRef.current.getApi().addEvent(session);
    }
  }

  function handleEventClick(clickInfo: EventClickInfo) {
    // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.id}'?`)) {
            clickInfo.event.remove()
        }
}

  return (
    <div className='demo-app'>
      <ModalAddSession
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSessionCreated={handleSessionCreated}
        start_time={modalInfo?.start ? new Date(modalInfo.start) : new Date()}
        end_time={modalInfo?.end ? new Date(modalInfo.end) : new Date()}
        eventId={Number(eventId)}
      />
      <div className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
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
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
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
