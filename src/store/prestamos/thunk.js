import bibliotecaApi from "../../api/bibliotecaApi";
import { onClearCarrito } from "./carritoSlice";
import { onListarPrestamos, onSavePrestamo } from "./prestamoSlice";
import { onCloseModalPrestamos } from "../ui/uiSlice";
import { onListarReservas, onSaveReserva } from "./reservaSlice";
import { onSaveLibro } from "../biblioteca/libroSlice";
import { onSaveEjemplar } from "../biblioteca/ejemplarSlice";

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

export const startListarReservas = (rut) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.get(`reservas/listar?rut=${rut}`)
            
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

export const startPrestarLibro = (ejemplaresPrestados, idVecino, estadoPrestamo, idBibliotecario, descontarStock) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.post('prestamos/prestar', { 
                id_vecino: idVecino,
                id_ejemplar: ejemplaresPrestados,
                id_bibliotecario: idBibliotecario,
                descontar_stock: descontarStock,
                estado_prestamo: estadoPrestamo
            })

            dispatch(onCloseModalPrestamos())
            dispatch(onSaveLibro())
            dispatch(onSaveEjemplar())

        } catch (error) {

            console.log(error);
            
        }

    }

}

export const startListarPrestamos = (rut) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`prestamos/listar?rut=${rut}`)

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

            dispatch(onSavePrestamo())

        } catch (error) {

            console.log(error);
            
        }

    }

}

export const startRenovarPrestamo = ({id}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`prestamos/renovar/${id}`)

            console.log(data);

            dispatch(onSavePrestamo())

        } catch (error) {

            console.log(error);
            
        }

    }

}


