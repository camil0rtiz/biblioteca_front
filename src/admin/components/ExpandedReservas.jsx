import { useDispatch, useSelector } from "react-redux";
import { CButton } from "@coreui/react";
import DataTable from "react-data-table-component";
import { paginacionOpciones } from "../../helpers/paginacionOpciones";
import { onAgregarEjemplarCarrito } from "../../store/prestamos/carritoSlice";
import { onOpenCarritoAdmin } from "../../store/ui/uiSlice";
import { onIdsReserva } from "../../store/prestamos/reservaSlice";

export const ExpandedReservas = ({data}) => {

    const { carritoReserva } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const id_usuario = data.id_usuario

    const handleCarritoReserva = (data,id_usuario) => {

        if(carritoReserva.length < 2){
            
            dispatch(onAgregarEjemplarCarrito(data))

        }

        dispatch(onIdsReserva(id_usuario))
        dispatch(onOpenCarritoAdmin())
        
    }

    const columns = [
        
        {
            name: 'N° Registro',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'ISBN',
            selector: row => row.isbn_ejemplar,
            sortable: true,
        },
        {
            name: 'Dewey',
            selector: row => row.dewey_unic_ejemplar,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div>
                                    <CButton color="primary" onClick={() => handleCarritoReserva(data, id_usuario)}>
                                        Agregar
                                    </CButton>
                                </div>
                            </div>,
            width: "250px" 
        }, 
    ];

    return (
        <DataTable
            responsive
            columns={columns}
            data={data.ejemplares}
            highlightOnHover={true}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent={<span className='mt-4'>No se encontro ningún ejemplar disponible</span>}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            persistTableHead
            striped
        />
    )
}
