import { CalendarEvent, Navbar,CalendarModal} from "../components";
//react calendar
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { addHours} from "date-fns";
import { localizer,GetMenssagesES } from "../../helpers";
import { useState } from "react";


const event =[{
    title : 'Postular a nuevos trabajos',
    notes: 'Revisar ofertas',
    start: new Date(),
    end:  addHours(new Date(),2),
    bgColor :'#8100cc',
    user:{
        _id:'101',
        name:'Demilio'

    }
}]

export const CalendarPage = () => {


    const [UltimaVista, setUltimaVista] = useState(localStorage.getItem('UltimaVista')|| 'week')

    const eventStyleGetter = (event,start,end,isSelected)=>{
        const style = {
            backgroundColor :'#8100cc',
            borderRadius:'5px',
            opacity: 0.8,
            color:'white'
        }
        return{
            style
        }
    }
    //evento doble click
    const onDoubleClick = (event) =>{
        console.log({doubleClick:event});
    }
    //evento click
    const onSelect = (event) =>{
        console.log({click:event});
    }
    //evento cambio de pagina
    const onViewChanged = (event) =>{
        localStorage.setItem('UltimaVista',event);
    }

  return (
    <div>
      <Navbar />
      <Calendar
      messages={GetMenssagesES()}
      culture="es"
      defaultView={UltimaVista}
      localizer={localizer}
      events={event}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 120px )',marginLeft:20,marginRight:20}}
      eventPropGetter={eventStyleGetter}
      components={{event:CalendarEvent}}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />
        <CalendarModal/>
    </div>
  );
};
