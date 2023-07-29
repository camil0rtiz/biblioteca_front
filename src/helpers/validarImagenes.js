export const validaImagenes = (file, tipo) => {

    const formatosAceptados = tipo === 2
    ? ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
    : ['image/png', 'image/jpeg', 'image/jpg'];

    const fileType = file.type

    if (!formatosAceptados.includes(fileType)) {

        return false

    } else {

        return true

    }

}