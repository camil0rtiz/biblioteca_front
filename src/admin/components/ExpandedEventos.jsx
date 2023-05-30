import { CListGroup, CListGroupItem } from '@coreui/react'

export const ExpandedEventos = ({data}) => {

    console.log(data);

    return (
        <CListGroup as="ol">
            <CListGroupItem>     
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Descripción {data.titulo_evento}</div>
                    <p dangerouslySetInnerHTML={{ __html: data.descripcion_evento}}></p>
                </div>
            </CListGroupItem>
        </CListGroup>
    )

}
