import DataTable from 'react-data-table-component'
import { paginacionOpciones } from '../../helpers/paginacionOpciones'
import { CButton } from '@coreui/react'
import { useDispatch } from 'react-redux';
import { onOpenModalPrestamos } from '../../store/ui/uiSlice';

export const ExpandedLibros = ({ data }) => {

    const dispatch = useDispatch()

    const handleShow = () => {
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
                                    <CButton color="primary" onClick={() => handleShow()}>
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