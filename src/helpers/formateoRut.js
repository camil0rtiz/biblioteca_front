
export const formateoRut = (rut, setValue) => {
    
    var firstValue = rut.slice(0,1);

    if (isNaN(firstValue) === false) {

        var valor = rut.replace(/^0+|[^0-9kK]+/g, "");
        rut = valor;

        var number = valor.slice(0,-1);
        var dv = valor.slice(-1);

        if(number === '') {
            rut = valor
        }else{
            rut = parseInt(number) + '-' + dv;
        }
    }
    
    setValue('registroRut', rut)

}