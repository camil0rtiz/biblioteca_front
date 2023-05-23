import ReactPaginate from 'react-paginate';

export const PaginadorComponent = ({cantPaginas, setNumPagina}) => {
    return (
        <ReactPaginate 
            nextLabel="Siguiente" 
            previousLabel="Anterior"        
            className='pagination justify-content-center gap-2 my-4' 
            pageCount={cantPaginas}
            nextClassName="btn" 
            previousClassName='btn'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            activeClassName='active'         
            onPageChange={(data)=>setNumPagina(data.selected + 1)}
        />
    )
}
