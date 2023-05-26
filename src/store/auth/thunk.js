import bibliotecaApi from "../../api/bibliotecaApi"
import { login, logout, onErrorMessage, onNotAuthenticatedLogin } from "./authSlice"
import { onClearUser, onListarUsersHabilitados, onListarUsersPendientes, onSave } from "./userSlice"
import { onCloseModal } from "../ui/uiSlice"

export const startLogin = (loginRut, loginPassword, reset) => {

    return async( dispatch ) => {
        
        try {

            const { data } = await bibliotecaApi.post('usuarios/login', { 
                'rut_usuario':loginRut,
                'password':loginPassword 
            })
            reset()
            localStorage.setItem('token',`Bearer ${data.token}`)
            localStorage.setItem('user', JSON.stringify(data.data))  
            dispatch(login(data.data))
            
        } catch (error) {

            reset()
            dispatch(onErrorMessage())
            dispatch(onNotAuthenticatedLogin())
            
        }

    }

} 

export const startLogout = () => {

    return async( dispatch ) => {
        
        try {

            await bibliotecaApi.post('usuarios/logout')
            localStorage.clear()
            dispatch(logout())

        } catch (error) {

            localStorage.clear()
            console.log(error.response)

        }

    }
    
} 

export const startRefrech = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    return async( dispatch ) => {

        if(!user) return dispatch(logout())

        dispatch(dispatch(login( user )))

    }

} 

export const startAgregarUsuario = ({
    registroRut, 
    registroNombre,
    registroApellidoPaterno,
    registroApellidoMaterno,
    registroNumeroCelular,
    registroCorreo,
    registroDireccion,
    registroNumCasa,
    registroFechaNacimiento,
    registroPassword,
    idMembresia,
    estadoUsuario,
    registroComproTransferencia,
    registroComproDomicilio,
    idRol
}) => {

    const formData = new FormData()
    formData.append('rut_usuario', registroRut)
    formData.append('nombre_usuario', registroNombre)
    formData.append('apellido_pate_usuario', registroApellidoPaterno)
    formData.append('apellido_mate_usuario', registroApellidoMaterno)
    formData.append('numero_tele_usuario', registroNumeroCelular)
    formData.append('email', registroCorreo)
    formData.append('password', registroPassword)
    formData.append('calle_usuario', registroDireccion)
    formData.append('numero_casa_usuario', registroNumCasa)
    formData.append('fecha_naci_usuario', registroFechaNacimiento)
    formData.append('id_membresia', idMembresia)
    formData.append('estado_usuario', estadoUsuario)
    formData.append('id_rol', idRol)
    formData.append('comprobante1', registroComproTransferencia)
    formData.append('comprobante2', registroComproDomicilio)
    
    return async( dispatch ) => {

        try {

            const { data } = await bibliotecaApi.post('usuarios/agregar',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(data);

            dispatch(onClearUser())
            dispatch(onCloseModal())
            dispatch(onSave())

            // dispatch( login( data.user ) )
        } catch (error) {

            console.log(error.response)

        }

    }
}

export const startListarUsuariosHabilitados = () => {

    return async( dispatch ) => {

        try {

            const response = await bibliotecaApi.get('usuarios/listarHabilitados')

            dispatch(onListarUsersHabilitados(response.data))

        } catch (error) {
        
            console.log(error.response)
            
        }

    }
}

export const startListarUsuariosPendientes = () => {

    return async( dispatch ) => {

        try {

            const response = await bibliotecaApi.get('usuarios/listarPendientes')

            dispatch(onListarUsersPendientes(response.data))
        
        } catch (error) {
        
            console.log(error.response)
            
        }

    }
}

export const startActualizarUsuario = ({
    id,
    registroRut, 
    registroNombre,
    registroApellidoPaterno,
    registroApellidoMaterno,
    registroNumeroCelular,
    registroCorreo,
    registroDireccion,
    registroNumCasa,
    registroFechaNacimiento,
    registroPassword,
    idRol
}) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`usuarios/actualizar/${id}`, {
                'rut_usuario':registroRut,
                'nombre_usuario': registroNombre,
                'apellido_pate_usuario':registroApellidoPaterno,
                'apellido_mate_usuario': registroApellidoMaterno,
                'numero_tele_usuario': registroNumeroCelular,
                'email': registroCorreo,
                'password':registroPassword,
                'calle_usuario': registroDireccion,
                'numero_casa_usuario': registroNumCasa,
                'fecha_naci_usuario': registroFechaNacimiento,
                'id_rol': idRol
            })

            dispatch(onClearUser())
            dispatch(onCloseModal())
            dispatch(onSave())

        } catch (error) {

            console.log(error.response)

        }

    }
}

export const startHabilitarUsuario = (
    id,
    estadoUsuario
) => {

    return async( dispatch ) => {

        try {

            const {data} = await bibliotecaApi.put(`usuarios/habilitar/${id}`, {
                'estado_usuario': estadoUsuario
            })

            dispatch(onSave())

        } catch (error) {

            console.log(error.response)

        }

    }
}

export const startDescargarComprobante = (id) => {

    console.log(id);

    return async( dispatch ) => {

        try {

            const response = await bibliotecaApi.get(`usuarios/comprobante/${id}`, {
                responseType: 'blob',
            })

              // Crear una URL de objeto para el archivo descargado
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Crear un enlace para descargar el archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'nombre-archivo.pdf'); // Establece el nombre de archivo deseado

            // Agregar el enlace al documento y hacer clic en él para iniciar la descarga
            document.body.appendChild(link);
            link.click();

            // Limpiar la URL de objeto y eliminar el enlace
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

        } catch (error) {

            console.log(error.response)

        }

    }
} 

export const startEliminarUsuario = ({ id }) => {

    return async( dispatch ) => {
        
        try {
            
            await bibliotecaApi.delete(`usuarios/eliminar/${id}`)

            dispatch(onSave())

        } catch (error) {

            console.log(error.response)

        }

    }
}

export const startListarRoles = () => {

    return async( dispatch ) => {

        try {

            const response = await bibliotecaApi.get('roles/listar')

            dispatch(onListarUsers(response.data))
        
        } catch (error) {
        
            console.log(error.response)
            
        }

    }
}