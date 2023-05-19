export const customStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        border: state.isFocused ?? '3px solid #6c757d',
        boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(38, 143, 255, 0.25)' : '',
    }),
}
