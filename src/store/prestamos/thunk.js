import bibliotecaApi from "../../api/bibliotecaApi";
import { onClearCarrito } from "./carritoSlice";
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