export function validarFecha(fecha) {

    const today = new Date();
    const minDate = new Date('1900-01-01');
    const userDate = new Date(fecha);

    if (userDate >= minDate && userDate <= today) {

        return true

    } else {

        return false

    }
}