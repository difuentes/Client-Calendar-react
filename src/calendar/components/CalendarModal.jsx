import { addHours } from "date-fns";
import { useMemo, useState } from "react";
import Modal from "react-modal";
//DatePicker
import DatePicker, { registerLocale } from "react-datepicker";
//date-fns
import { differenceInSeconds } from "date-fns/esm";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
registerLocale("es", es);

//stylos
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
//set de app
Modal.setAppElement("#root");
// componente
export const CalendarModal = () => {
  //state modal
  const [isOpen, setisOpen] = useState(true);
  const [formSubmit,setFormSubmit] = useState(false);
  //state form
  const [formValues, setformValues] = useState({
    title: "Ingrese una nota",
    notes: "Descripción de la nota",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  //memo para set class de title
  const tittleClass = useMemo(()=>{
    if(!formSubmit) return "";
    return(formValues.title.length > 0 ) ? 'is-valid' : 'is-invalid';
  
  },[formValues.title,formSubmit])

    //memo para set class de notes
    const notesClass = useMemo(()=>{
        if(!formSubmit) return "";
        return(formValues.notes.length > 0 ) ? 'is-valid' : 'is-invalid';
    },[formSubmit.notes,formSubmit])

  //metodo cerrar modal
  const oncloseModal = () => {
    console.log("close");
    setisOpen(!isOpen);
  };
  //onChange input
  const onInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  //onChange Date
  const onDateChange = (event, changig) => {
    setformValues({
      ...formValues,
      [changig]: event,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmit(true);
    //Validaciones
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      toast("Fechas mal ingresada!");
    }
    if(formValues.title.length){
        toast("Ingrese Titulo de la nota ");
        return;
    }
    if(formValues.notes.length){
        toast("Ingrese leve nota ");
        return;
    }
  };

  return (
    <>
      <ToastContainer 
        closeOnClick
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={oncloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1
          className="text-center "
          style={{ color: "#8100cc", textTransform: "uppercase" }}
        >
          Nuevo evento
        </h1>
        <hr />
        <form onSubmit={onSubmit} className="container">
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              selected={formValues.start}
              className="form-control"
              name="start"
              onChange={(event) => onDateChange(event, "start")}
              dateFormat="Pp"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              selected={formValues.end}
              className="form-control"
              name="end"
              onChange={(event) => onDateChange(event, "end")}
              dateFormat="Pp"
              minDate={formValues.start}
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>
          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${tittleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className={`form-control ${notesClass}`}
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-block "
            style={{ color: "#8100cc", borderColor: "#8100cc" }}
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
