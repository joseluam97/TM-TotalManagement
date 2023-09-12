import {

    CAMBIAR_VALOR_TAB,
    CAMBIAR_VALOR_TAB_EXITO,
    CAMBIAR_VALOR_TAB_ERROR

} from './types';



//Cambiar valorTAB

export function cambiarValorTabAction(valorTab) {

    return (dispatch) => {
        dispatch (cambiarValorTab())

        try {
            dispatch (cambiarValorTabExito(valorTab))

        } catch (error) {

            dispatch (cambiarValorTabError(true))
        }

    }

}

const cambiarValorTab = () => ({
    type: CAMBIAR_VALOR_TAB,
    payload: true

})

const cambiarValorTabExito = valorTab => ({
    type: CAMBIAR_VALOR_TAB_EXITO,
    payload: valorTab

})

const cambiarValorTabError = estado => ({
  type: CAMBIAR_VALOR_TAB_ERROR,
  payload: estado
})