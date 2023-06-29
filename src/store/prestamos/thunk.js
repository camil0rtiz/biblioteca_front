import bibliotecaApi from "../../api/bibliotecaApi";
import { onClearCarrito } from "./carritoSlice";
import { onListarPrestamos } from "./prestamoSlice";
import { onListarReservas, onSaveReserva } from "./reservaSlice";

export const startReservarLibro = (librosReservados, idVecino, estadoReserva) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('reservas/reservar', { 
                id_usuario: idVecino,
                id_libro: librosReservados,
                estado_reserva: estadoReserva
            })

            dispatch(onClearCarrito())

        } catch (error) {

            console.log(error);
            
        }

    }

} 

export const startListarReservas = (nombre) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.get(`reservas/listar?nombre=${nombre}`)
            
            dispatch(onListarReservas(data.data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }

}

export const startEliminarReserva = ({id, estadoReserva}) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.put(`reservas/eliminar/${id}`, {
                'estado_reserva': estadoReserva,
            })
            
            dispatch(onSaveReserva())
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }

}

export const startPrestarLibro = (ejemplaresPrestados, idVecino, estadoPrestamo, idBibliotecario) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.post('prestamos/prestar', { 
                id_vecino: idVecino,
                id_ejemplar: ejemplaresPrestados,
                id_bibliotecario: idBibliotecario,
                estado_prestamo: estadoPrestamo
            })

        } catch (error) {

            console.log(error);
            
        }

    }

}

export const startListarPrestamos = () => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`prestamos/listar`)

            dispatch(onListarPrestamos(data.data))

        } catch (error) {

            console.log(error);
            
        }

    }

} 

export const startDevolucionPrestamo = ({id, id_ejemplar, id_libro}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`prestamos/devolver/${id}`, {
                'id_ejemplar': id_ejemplar,
                'id_libro': id_libro,
            });

        } catch (error) {

            console.log(error);
            
        }

    }

} 

