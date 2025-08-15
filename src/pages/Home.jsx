import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const obtenerContactos = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/Martin/contacts")
			console.log(response)
			if (response.status == 404) {
				crearUsuario()
				return
			}
			const data = await response.json()
			console.log(data.contacts)
			dispatch({
				type: "obtener_contactos",
				payload: data.contacts
			})
		} catch (error) {

			console.log(error)
		}
	}

	const borrarContacto = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/Martin/contacts/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }

			})
			console.log(response)
			if (response.status == 204) {
				obtenerContactos()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const crearUsuario = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/Martin", {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			})
			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		obtenerContactos()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1>Contactos</h1>
			<div className="d-flex justify-content-center mt-3">
				{store.contactos.map((contacto) => (
					<div className="card mb-3" key={contacto.id} style={{ maxWidth: "540px" }}>
						<div className="row g-0">
							<div className="col-md-4">
								<img src={rigoImageUrl} className="img-fluid rounded-start p-3" alt={contacto.name} />
							</div>
							<div className="col-md-8">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<h5 className="card-title">{contacto.name}</h5>
										<button className="btn btn-danger" onClick={() => borrarContacto(contacto.id)}> X </button>

									</div>
									<p className="card-text">telefono: {contacto.phone}</p>
									<p className="card-text">direccion: {contacto.address}</p>
									<p className="card-text">email: {contacto.email}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}; 