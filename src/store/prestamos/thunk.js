import bibliotecaApi from "../../api/bibliotecaApi";
import { onClearCarrito } from "./carritoSlice";

// export const startPrestamoLibro = (librosReservados, idVecino) => {

//     return async( dispatch ) => {

//         try {

//             const { data } = await bibliotecaApi.post('prestamos/reservar', { 
//                 id_vecino: idVecino,
//                 id_ejemplar: librosReservados,
//                 estado_prestamo: 'pendiente'
//             })

//             console.log(data);

//         } catch (error) {

//             console.log(error);
            
//         }

//     }

// }

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