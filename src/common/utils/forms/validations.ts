export const validateMessages = {
    required: `$\{label} es requerido.`,
    types: {
      email: `$\{label} no es un email válido.`,
      number: `$\{label} no es un número válido.`,
      regexp: `$\{label} formato no válido.`,
    },
    pattern: {
      mismatch: `$\{label} formato no válido.`,
    },
    number: {
      len: `"$\{label}" debe tener exactamente "$\{len}" caracteres.`,
      min: `"$\{label}" debe ser mayor o igual a "$\{min}".`,
    },
    string: {
      len: `"$\{label}" debe tener exactamente "$\{len}" caracteres.`,
    },
  }
  export const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 4 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 20 },
      lg: { span: 16 },
    },
  }