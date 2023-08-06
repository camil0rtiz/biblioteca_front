import bibliotecaApi from "../../api/bibliotecaApi";
import { onClearCarrito, onClearCarritoPrestamo, onClearCarritoReserva } from "./carritoSlice";
import { onErrorListarPrestamo, onErrorPrestamo, onListarPrestamos, onSavePrestamo } from "./prestamoSlice";
import { onCloseCarritoAdmin, onCloseModalPrestamos } from "../ui/uiSlice";
import { onClearErrorReserva, onErrorListarReserva, onErrorReserva, onListarReservas, onSaveReserva, onSuccesReserva } from "./reservaSlice";
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
            dispatch(onClearErrorReserva())
            dispatch(onSuccesReserva(true))

        } catch (error) {
            
            dispatch(onErrorReserva({error:true, errorMessage: error.response.data.message}))
            dispatch(onSuccesReserva(false))
            
        }

    }

} 

export const startListarReservas = (rut) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.get(`reservas/listar?rut=${rut}`)
            
            dispatch(onListarReservas(data.data))
                    
        } catch (error) {
        
            dispatch(onErrorListarReserva({error:true, errorMessage: error.response.data.message}))
            
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

export const startPrestarLibro = (ejemplaresPrestados, idVecino, estadoPrestamo, idBibliotecario, descontarStock, reservaId) => {
    
    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.post('prestamos/prestar', { 
                id_vecino: idVecino,
                id_ejemplar: ejemplaresPrestados,
                id_bibliotecario: idBibliotecario,
                id_reserva: reservaId,
                descontar_stock: descontarStock,
                estado_prestamo: estadoPrestamo
            })

            dispatch(onCloseModalPrestamos())
            dispatch(onClearCarritoPrestamo())
            dispatch(onSaveLibro())
            dispatch(onSaveEjemplar())
            dispatch(onCloseCarritoAdmin())
            dispatch(onClearCarritoReserva())
            dispatch(onSaveReserva())

        } catch (error) {

            dispatch(onErrorPrestamo({error:true, errorMessage: error.response.data.message}))
        
        }

    }

}

export const startListarPrestamos = (rut) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`prestamos/listar?rut=${rut}`)

            dispatch(onListarPrestamos(data.data))

        } catch (error) {

            dispatch(onErrorListarPrestamo({error:true, errorMessage: error.response.data.message}))
            
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


