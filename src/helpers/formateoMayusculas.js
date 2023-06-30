
export const formateoMayusculas = (input) => {

    return input.replace(/\b\w/g, (match) => match.toUpperCase());
    
};