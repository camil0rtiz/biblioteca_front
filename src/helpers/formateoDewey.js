
export const formateoDewey = (input) => {
    
    const primerosTresCaracteres = input.slice(0, 3);

    const primerosTresDigitos = /^[1-9]\d{0,2}$/.test(primerosTresCaracteres)
        ? primerosTresCaracteres
        : '';

    const restoInput = input.slice(3);

    const espacio = restoInput.length > 0 ? ' ' : '';

    const inputFormateado = `${primerosTresDigitos}${espacio}${restoInput.replace(/\s/g, '')}`;

    const inputMayusculas = inputFormateado.toUpperCase();

    return inputMayusculas;
}




