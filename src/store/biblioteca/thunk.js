import bibliotecaApi from "../../api/bibliotecaApi";
import { onCloseModal, onCloseModalEjemplar } from "../ui/uiSlice";
import { onClearAutores, onListarAutores, onSaveAutor, onLoadingFalse } from "./autorSlice";
import { onClearEditoriales, onListarEditoriales, onSaveEditorial } from "./editorialSlice";
import { onListarEjemplares, onLoadingFalseE, onSaveEjemplar } from "./ejemplarSlice";
import { onListarEventos, onListarEventosHome, onSaveEvento } from "./eventoSlice";
import { onCantidadPaginado, onCantidadPaginas, onClearLibros, onListarLibros, onSaveLibro } from "./libroSlice";

export const startAgregarLibro = ({tituloLibro, isbnLibro, deweyLibro, categoriaLibro, numPagLibro, anioPublicacionLibro, resenaLibro, estadoLibro, idAutor, portada }) => {

    const formData = new FormData()
    formData.append('titulo_libro', tituloLibro)
    formData.append('isbn_libro', isbnLibro)
    formData.append('dewey_libro', deweyLibro)
    formData.append('resena_libro', resenaLibro)
    formData.append('numero_pagi_libro', numPagLibro)
    formData.append('categoria_libro', categoriaLibro)
    formData.append('anio_publi_libro', anioPublicacionLibro)
    formData.append('estado_libro', estadoLibro)
    formData.append('id_autor', idAutor)
    formData.append('portada', portada)
    
    return async( dispatch ) => {
        
        try {

            const { data } = await bibliotecaApi.post('libros/agregar',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            dispatch(onClearLibros())
            dispatch(onCloseModal())
            dispatch(onSaveLibro())
        
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarLibros = (page, perPage) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`libros/listar?page=${page}&per_page=${perPage}}`)

            dispatch(onCantidadPaginas(data.data2.total))
            dispatch(onCantidadPaginado(data.data2.last_page))
            dispatch(onListarLibros(data.data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startActualizarLibro = ({id, tituloLibro, isbnLibro, deweyLibro, categoriaLibro, numPagLibro, fechaPublicacionLibro, resenaLibro, idAutor}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`libros/actualizar/${id}`, {
                'titulo_libro': tituloLibro,
                'isbn_libro': isbnLibro,
                'dewey_libro': deweyLibro,
                'resena_libro': resenaLibro,
                'numero_pagi_libro': numPagLibro,
                'categoria_libro': categoriaLibro,
                'fecha_publi_libro': fechaPublicacionLibro,
                'id_autor': idAutor
            });

            dispatch(onClearLibros())
            dispatch(onCloseModal())
            dispatch(onSaveLibro())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startAgregarAutor = ({autorNombre, agregarAutorSelect}) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('autores/agregar', {
                'nombre_autor': autorNombre,
            })
            
            if(!agregarAutorSelect){
        
                dispatch(onCloseModal())

            }

            dispatch(onLoadingFalse())
            dispatch(onClearAutores())
            dispatch(onSaveAutor())
            

        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarAutores = () => {

    return async( dispatch ) => {

        try {

            const response = await bibliotecaApi.get('autores/listar')

            dispatch(onListarAutores(response.data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startActualizarAutor = ({id, autorNombre}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`autores/actualizar/${id}`, {
                'nombre_autor': autorNombre,
            });

            dispatch(onClearAutores())
            dispatch(onCloseModal())
            dispatch(onSaveAutor())
    
        } catch (error) {

            console.error(error);

        }

    }
}

export const startAgregarEditorial = ({editorialNombre}) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('editoriales/agregar', {
                'nombre_editorial': editorialNombre,
            })

            dispatch(onLoadingFalseE())
            dispatch(onClearEditoriales())
            dispatch(onCloseModal())
            dispatch(onSaveEjemplar())
            dispatch(onSaveEditorial())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarEditoriales = () => {
    

    return async( dispatch ) => {

        try {

            const response = await bibliotecaApi.get('editoriales/listar')

            dispatch(onListarEditoriales(response.data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startBuscarEditorial = (editorial) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`editoriales/buscar?nombre=${editorial}`)

            dispatch(onListarEditoriales(data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startActualizarEditorial = ({id, editorialNombre}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`editoriales/actualizar/${id}`, {
                'nombre_editorial': editorialNombre,
            })

            dispatch(onClearEditoriales())
            dispatch(onCloseModal())
            dispatch(onSaveEditorial())
    
        } catch (error) {

            console.error(error);

        }

    }
}

export const startListarEjemplares = (id) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.get(`ejemplares/listar?id_libro=${id}`)

            dispatch(onListarEjemplares(data.data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startAgregarEjemplar = ({id_editorial, id_libro, anioEdiEjemplar, numResgisEjemplar, deweyEjemplar ,estado_ejemplar}) => {

    console.log({id_editorial, id_libro, anioEdiEjemplar, numResgisEjemplar,deweyEjemplar ,estado_ejemplar});

    return async( dispatch ) => {

        try {
            
            const { data } = await bibliotecaApi.post('ejemplares/agregar', {
                id_libro,
                id_editorial,
                'numero_regis_ejemplar': numResgisEjemplar,
                'anio_edi_ejemplar': anioEdiEjemplar,
                'dewey_unic_ejemplar': deweyEjemplar,
                'estado_ejemplar': estado_ejemplar
            })

            dispatch(onLoadingFalseE())
            dispatch(onCloseModalEjemplar())
            dispatch(onSaveLibro())
            dispatch(onSaveEjemplar())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarEventos = () => {

    return async( dispatch ) => {

        try {

            const response = await bibliotecaApi.get('eventos/listar')

            dispatch(onListarEventos(response.data))
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarEventosHome = () => {

    return async( dispatch ) => {

        try {
    
            const response = await bibliotecaApi.get('eventos/listarEventosHome')
    
            dispatch(onListarEventosHome(response.data.data))
    
        } catch (error) {
        
            console.error(error)
            
        }

    }

}

export const startAgregarEvento = ({eventoTitulo,eventoImagen,eventoDescripcion,id_usuario,id_categoria,estado_evento}) => {

    const formData = new FormData()
    formData.append('id_categoria', id_categoria)
    formData.append('id_usuario', id_usuario)
    formData.append('titulo_evento', eventoTitulo)
    formData.append('descripcion_evento', eventoDescripcion)
    formData.append('estado_evento', estado_evento)
    
     // Iterar sobre la matriz de imágenes y agregarlas al FormData
    for (let i = 0; i < eventoImagen.length; i++) {

        formData.append(`imagenesEvento[${i}]`, eventoImagen[i])

    }

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('eventos/agregar',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            dispatch(onCloseModal())
            dispatch(onSaveEvento())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startActualizarEvento = ({id,eventoTitulo,eventoImagen,eventoDescripcion,id_categoria}) => {

    return async( dispatch ) => {

        // try {

        //     const { data } = await bibliotecaApi.post('eventos/agregar', {
        //         id_categoria,
        //         id_usuario,
        //         estado_evento,
        //         'titulo_evento': eventoTitulo,
        //         'descripcion_evento': eventoDescripcion,
        //     })
            
        //     dispatch(onCloseModal())
        //     dispatch(onSaveEvento())
            
        // } catch (error) {
        
        //     console.error(error)
            
        // }

    }
}

