import bibliotecaApi from "../../api/bibliotecaApi";
import { onCloseModal, onCloseModalEjemplar, onCloseModalPortada, onCloseModalPortadaEvento } from "../ui/uiSlice";
import { onClearAutores, onListarAutores, onSaveAutor, onLoadingFalse } from "./autorSlice";
import { onClearEditoriales, onListarEditoriales, onSaveEditorial } from "./editorialSlice";
import { onListarEjemplares, onLoadingFalseE, onSaveEjemplar } from "./ejemplarSlice";
import { onClearEventos, onListarEventos, onListarEventosHome, onSaveEvento } from "./eventoSlice";
import { onCantidadPaginado, onCantidadPaginas, onClearLibros, onListarLibros, onListarUltimosAgregados, onListarMasReservados, onSaveLibro, onMessageError, onClearMessageError } from "./libroSlice";

export const startAgregarLibro = ({tituloLibro, deweyLibro, anioPublicacionLibro, resenaLibro, estadoLibro, idAutor, portada }) => {

    const formData = new FormData()
    formData.append('titulo_libro', tituloLibro)
    formData.append('dewey_libro', deweyLibro)
    formData.append('resena_libro', resenaLibro)
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
            dispatch(onClearMessageError())
        
        } catch (error) {
            
            console.error()

            dispatch(onMessageError(true))

            // dispatch(onMessageError(error.response.data.message))
        
        }

    }
}

export const startListarLibros = (page, perPage, filterText) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`libros/listar?page=${page}&per_page=${perPage}&nombre=${filterText}`)

            dispatch(onCantidadPaginas(data.data2.total))
            dispatch(onCantidadPaginado(data.data2.last_page))
            dispatch(onListarLibros(data.data))

        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarMasReservados = () => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`libros/listarMasReservados`)

            dispatch(onListarMasReservados(data.data))

        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarUltimosAgregados = () => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`libros/listarUltimosAgregados`)

            dispatch(onListarUltimosAgregados(data.data))

        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startActualizarLibro = ({id, tituloLibro, deweyLibro, fechaPublicacionLibro, resenaLibro, idAutor}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`libros/actualizar/${id}`, {
                'titulo_libro': tituloLibro,
                'dewey_libro': deweyLibro,
                'resena_libro': resenaLibro,
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

export const startEliminarLibro = ({id, estado_libro}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`libros/eliminar/${id}`, {
                'estado_libro': estado_libro,
            });

            dispatch(onSaveLibro())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startCambiarPortadaLibro = (id, idPortada, portadaLibro) => {

    const formData = new FormData();
    formData.append('portada', portadaLibro);
    formData.append('id_portada', idPortada);
    formData.append('id_libro', id);

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.post(`libros/actualizarPortada`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            })

            dispatch(onSaveLibro())
            dispatch(onCloseModalPortada())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startAgregarAutor = ({autorNombre, agregarAutorSelect, estadoAutor}) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('autores/agregar', {
                'nombre_autor': autorNombre,
                'estado_autor': estadoAutor 
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

export const startBuscarAutor = (autor) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.get(`autores/buscar?nombre=${autor}`)

            dispatch(onListarAutores(data))
                    
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

export const startEliminarAutor = ({id, estado_autor}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`autores/eliminar/${id}`, {
                'estado_autor': estado_autor,
            })

            dispatch(onSaveAutor())
    
        } catch (error) {

            console.error(error);

        }

    }
}

export const startAgregarEditorial = ({editorialNombre, agregarEditorialSelect, estadoEditorial}) => {

    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('editoriales/agregar', {
                'nombre_editorial': editorialNombre,
                'estado_editorial': estadoEditorial
            })

            if(!agregarEditorialSelect){
        
                dispatch(onCloseModal())

            }

            dispatch(onLoadingFalseE())
            dispatch(onClearEditoriales())
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

export const startEliminarEditorial = ({id, estado_editorial}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`editoriales/eliminar/${id}`, {
                'estado_editorial': estado_editorial,
            })

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

export const startAgregarEjemplar = ({id_editorial, id_libro, anioEdiEjemplar, deweyEjemplar, isbnEjemplar, numPagEjemplar, estado_ejemplar}) => {

    return async( dispatch ) => {

        try {
            
            const { data } = await bibliotecaApi.post('ejemplares/agregar', {
                id_libro,
                id_editorial,
                'anio_edi_ejemplar': anioEdiEjemplar,
                'isbn_ejemplar': isbnEjemplar,
                'numero_pagi_ejemplar': numPagEjemplar,
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

export const startEliminarEjemplar = (id, estadoEjemplar) => {

    return async( dispatch ) => {

        try {
    
            const { data } = await bibliotecaApi.put(`ejemplares/eliminar/${id}`, {
                'estado_ejemplar': estadoEjemplar,
            })

            dispatch(onSaveLibro())
            dispatch(onSaveEjemplar())

        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startListarEventos = (titulo) => {

    return async( dispatch ) => {

        try {
    
            const response = await bibliotecaApi.get(`eventos/listar?nombre=${titulo}`)

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
    formData.append('eventoImagen', eventoImagen)
    formData.append('descripcion_evento', eventoDescripcion)
    formData.append('estado_evento', estado_evento)
    
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

export const startActualizarEvento = ({id,eventoTitulo,eventoDescripcion,id_categoria}) => {

    return async(dispatch) => {

        try {

            const { data } = await bibliotecaApi.put(`eventos/actualizar/${id}`, {
                id_categoria,
                'titulo_evento': eventoTitulo,
                'descripcion_evento': eventoDescripcion,
            })
            
            dispatch(onCloseModal())
            dispatch(onSaveEvento())
            dispatch(onClearEventos())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startEliminarEvento = ({id, estado_evento}) => {

    return async(dispatch) => {

        try {
    
            const { data } = await bibliotecaApi.put(`eventos/eliminar/${id}`, {
                'estado_evento': estado_evento,
            })

            dispatch(onSaveEvento())
                    
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

export const startCambiarPortadaEvento = (id, idPortada, eventoImagen) => {

    const formData = new FormData();
    formData.append('portada', eventoImagen);
    formData.append('id_evento', id);

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.post(`eventos/actualizarPortada`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            })

            dispatch(onCloseModalPortadaEvento())
            dispatch(onSaveEvento())
            dispatch(onClearEventos())
            
        } catch (error) {
        
            console.error(error)
            
        }

    }
}

