export function validarNumeroEnRango(numero) {

    const min = 1
    const max = 10000

    console.log(numero);

    if (numero >= min && numero <= max) {

        return true

    } else {

        return false

    }
}