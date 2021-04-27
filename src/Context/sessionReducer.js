import {
    INICIAR_SESION,
    FALLO_INICIO_SESION,
    TOKEN_VALIDO,
    LISTA_DE_RENOVACIONES_EXITOSO,
    LLAMADA_API,
    QUITAR_LOADER,
    LISTA_SOLICITUDES_EXITOSO,
    LISTA_SOLICITUDES_ENCERO,
    LISTA_SOLICITUDES_FALLO,
    INICIO_SESION_EXITOSO,
    LLAMADA_API_SOLICITUDES,
    LLAMADA_API_RENOVACIONES,
    CERRAR_SESION
} from './types'


export const sessionReducer = (state, action) => {
    switch (action.type) {
        case INICIO_SESION_EXITOSO:
            return {
                ...state,
                claims: action.payload,
                loader: false
            }
        case INICIAR_SESION:
            return {
                ...state,
                loader: true
            }
        case FALLO_INICIO_SESION:
            return {
                ...state,
                err: action.payload,
                loader: false
            }
        case TOKEN_VALIDO:
            return {
                ...state,
                claims: action.payload
            }
        case LLAMADA_API:
            return {
                ...state,
                loader: true
            }
        case LLAMADA_API_SOLICITUDES:
            return {
                ...state,
                renovations: [],
                loader: true
            }
        case LLAMADA_API_RENOVACIONES:
            return {
                ...state,
                requests: [],
                loader: true
            }
        case QUITAR_LOADER:
            return {
                ...state,
                loader: false
            }
        case LISTA_DE_RENOVACIONES_EXITOSO:
            return {
                ...state,
                loader: false,
                renovations: action.payload
            }
        case CERRAR_SESION:
            return {
                ...state,
                loader: false,
                renovations: [],
                err: true,
                claims: null
            }
        case LISTA_SOLICITUDES_EXITOSO:
            return {
                ...state,
                loader: false,
                requests: action.payload
            }
        case LISTA_SOLICITUDES_FALLO:
        case LISTA_SOLICITUDES_ENCERO:
            return {
                ...state,
                loader: false,
                requests: []
            }


        default:
            return state
    }
}
