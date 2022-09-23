import { Navbar } from "../components";
//react calendar
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { addHours} from "date-fns";
import { localizer,GetMenssagesES } from "../../helpers";


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

    const eventStyleGetter = (event,start,end,isSelected)=>{
        console.log(event,start,end,isSelected);

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

  return (
    <div>
      <Navbar />
      <Calendar
      messages={GetMenssagesES()}
      culture="es"
      localizer={localizer}
      events={event}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 120px )' ,marginLeft:20,marginRight:20}}
      eventPropGetter={eventStyleGetter}
    />
    </div>
  );
};
