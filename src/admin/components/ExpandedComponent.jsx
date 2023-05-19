import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table  } from 'react-bootstrap'
import { startListarEjemplares } from '../../store/biblioteca/thunk';

export const ExpandedComponent = ({ data }) => {

    const { ejemplares } = useSelector(state => state.ejemplar)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarEjemplares(data.id))
        
    }, [])

    return (
        
        <Table striped hover size="sm">
            <thead>
                <tr>
                    <th>Código único</th>
                    <th>Nombre ejemplar</th>
                    <th>Dewey ejemplar</th>
                    <th>Año edicion ejemplar</th>
                </tr>
            </thead>
            <tbody>
                {ejemplares.map(ejemplar => {
                    return (
                        <tr key={ejemplar.id}>
                            <td>{ejemplar.numero_regis_ejemplar}</td>
                            <td>{ejemplar.titulo_libro}</td>
                            <td>{ejemplar.dewey_unic_ejemplar}</td>
                            <td>{ejemplar.anio_edi_ejemplar}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        
    )

};