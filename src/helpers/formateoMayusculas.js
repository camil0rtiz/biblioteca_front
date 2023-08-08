
export const formateoMayusculas = (input) => {

    return input.replace(/(^|\n|\s)(\w)/g, (match) => match.toUpperCase())
    
};

export const formateoMinusculas = (input) => {

    return input.toLowerCase();

};