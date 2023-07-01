import DataTable from 'react-data-table-component'
import { paginacionOpciones } from '../../helpers/paginacionOpciones'
import { CButton } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { onOpenModalPrestamos } from '../../store/ui/uiSlice';
import { onAgregarPrestamoCarrito } from '../../store/prestamos/carritoSlice';

export const ExpandedLibros = ({ data }) => {

    const { modalPrestamos } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const handleShow = (data) => {

        if(modalPrestamos.length < 2){
            
            dispatch(onAgregarPrestamoCarrito(data))

        }

        dispatch(onOpenModalPrestamos())

    }

    const columns = [
        
        {
            name: 'N° Registro',
            selector: row => row.numero_regis_ejemplar,
            sortable: true,
        },
        {
            name: 'Dewey',
            selector: row => row.dewey_unic_ejemplar,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.estado_ejemplar,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div>
                                    <CButton color="primary" onClick={() => handleShow(data)}>
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
            pagination
            columns={columns}
            data={data.ejemplares}
            highlightOnHover={true}
            paginationComponentOptions={paginacionOpciones}
            noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            persistTableHead
            striped
        />

    )

};