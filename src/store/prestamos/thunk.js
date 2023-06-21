import bibliotecaApi from "../../api/bibliotecaApi";
import { onClearCarrito } from "./carritoSlice";
import { onListarReservas } from "./reservaSlice";

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

export const startListarReservas = () => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.get('reservas/listar')

            dispatch(onListarReservas(data.data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }

}