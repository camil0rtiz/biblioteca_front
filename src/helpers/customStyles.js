export const customStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? '#5e72e4' : '#cad1d7', // Morado cuando está enfocado, gris cuando no está enfocado
        boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(94, 114, 228, 0.25)': '', // Sombra morada cuando está enfocado
    }),
}
