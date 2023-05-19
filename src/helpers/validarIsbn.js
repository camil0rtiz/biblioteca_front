export const validaIsbn = (idbn) => {

      // eliminar guiones del isbn si es que los tiene
    isbn = isbn.replace(/-/g, '');

    // verificar que el ISBN tenga una longitud válida (10 o 13 caracteres)
    if (isbn.length !== 10 && isbn.length !== 13) {
        return false;
    }

    // calcular la suma de verificación del ISBN
    let sum = 0;
    for (let i = 0; i < isbn.length - 1; i++) {
        let digit = parseInt(isbn[i]);
        if (i % 2 === 0) {
        sum += digit * 1;
        } else {
        sum += digit * 3;
        }
    }

    // verificar si la suma de verificación es divisible por 10
    let checkDigit = (10 - (sum % 10)) % 10;
    return parseInt(isbn[isbn.length - 1]) === checkDigit;
}


