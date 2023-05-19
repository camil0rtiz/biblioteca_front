import { CFormInput } from "@coreui/react"

export const FiltroComponent = ({ filterText, onFilter, onPlaceholder }) => {

    return (
        <>
            <CFormInput
                type="text"
                className='form-control'
                value={filterText}
                onChange={onFilter}
                placeholder={onPlaceholder}

            />
        </>
    )
}
