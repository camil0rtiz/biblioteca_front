
export const formateoMayusculas = (input) => {

    return input.replace(/(^|\n|\s)(\w)/g, (match) => match.toUpperCase());
    
};