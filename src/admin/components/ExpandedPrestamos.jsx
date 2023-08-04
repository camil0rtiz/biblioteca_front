import DataTable from "react-data-table-component"
import { paginacionOpciones } from "../../helpers/paginacionOpciones"

export const ExpandedPrestamos = ({data}) => {

    console.log(data);

    const columns = [
        
        {
            name: 'N° Registro',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'N° Registro',
            selector: row => row. isbn_ejemplar,
            sortable: true,
        },
        {
            name: 'Dewey',
            selector: row => row.dewey_unic_ejemplar,
            sortable: true,
        },
    ];


    return (
        <DataTable
            responsive
            columns={columns}
            data={data.ejemplares}
            highlightOnHover={true}
            noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
            fixedHeader
            fixedHeaderScrollHeight="600px"
            persistTableHead
            striped
        />
    )
}
