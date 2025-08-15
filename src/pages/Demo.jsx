// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState } from "react";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const [name, setName] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [direccion, setDireccion] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(name, telefono, email, direccion)
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/Martin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "name": name,
          "phone": telefono,
          "email": email,
          "address": direccion,
        })
      })
      console.log(response)
      if (response.status==201){
        alert("contacto agregado")
        setName("")
        setDireccion("")
        setEmail("")
        setTelefono("")
      } else {
       alert("error de almacenamiento") 
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h1>Agregar Contacto</h1>
      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Telefono</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Direccion</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputPassword2" />
          </div>

          <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Agregar</button>
          <Link to ="/">Volver a la Agenda</Link>
        </form>
      </div>
    </div>
  );
};
