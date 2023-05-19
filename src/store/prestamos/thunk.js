import bibliotecaApi from "../../api/bibliotecaApi";

export const startReservarLibro = (librosReservados, idVecino) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('prestamos/reservar', { 
                id_vecino: idVecino,
                id_ejemplar: librosReservados,
                estado_prestamo: 'pendiente'
            })

            console.log(data);

        } catch (error) {

            console.log(error);
            
        }

    }

} 