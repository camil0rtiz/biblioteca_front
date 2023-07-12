import DataTable from 'react-data-table-component'
import { paginacionOpciones } from '../../helpers/paginacionOpciones'
import { CButton } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { onOpenModalPrestamos } from '../../store/ui/uiSlice';
import { onAgregarPrestamoCarrito } from '../../store/prestamos/carritoSlice';
import { startEliminarEjemplar } from '../../store/biblioteca/thunk';

export const ExpandedLibros = ({ data }) => {

    const { modalPrestamos } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const handleShow = (data) => {

        if(modalPrestamos.length < 2){
            
            dispatch(onAgregarPrestamoCarrito(data))

        }

        dispatch(onOpenModalPrestamos())

    }

    const handleEliminarEjemplar = ({id}) => {

        let estadoEjemplar = 3

        dispatch(startEliminarEjemplar(id, estadoEjemplar))

    }

    const columns = [
        
        {
            name: 'Dewey Ejemplar',
            selector: row => row.dewey_unic_ejemplar,
            sortable: true,
        },
        {
            name: 'ISBN',
            selector: row => row.isbn_ejemplar,
            sortable: true,
        },
        {
            name: 'Número de páginas',
            selector: row => row.numero_pagi_ejemplar,
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
                                    <CButton color="primary" className='mx-2' disabled={(data.estado_ejemplar == 2 ? true : false)} onClick={() => handleShow(data)}>
                                        Prestar
                                    </CButton>
                                </div>
                                <div>
                                    <CButton color="danger" disabled={(data.estado_ejemplar == 2 ? true : false)} onClick={() => handleEliminarEjemplar(data)}>
                                        Eliminar
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