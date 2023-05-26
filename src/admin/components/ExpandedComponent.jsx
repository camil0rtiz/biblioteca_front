import { CListGroup, CListGroupItem } from '@coreui/react';

export const ExpandedComponent = ({ data }) => {

    return (
        
        <CListGroup as="ol">
            <CListGroupItem>     
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Reseña {data.titulo_libro}</div>
                    <p dangerouslySetInnerHTML={{ __html: data.resena_libro}}></p>
                </div>
            </CListGroupItem>
        </CListGroup>

    )

};