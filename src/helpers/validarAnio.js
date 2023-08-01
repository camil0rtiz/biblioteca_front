

export const validarAnio = (año) => {
  
      const añoActual = new Date().getFullYear();
      const añoMinimo = 1800;
    
      const añoIngresado = parseInt(año, 10);
    
      if (isNaN(añoIngresado) || añoIngresado < añoMinimo || añoIngresado > añoActual) {
        return false;
      }
    
      return true;
      
}
