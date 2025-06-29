interface SelectOption {
  name: string;
  value: string;
  options: string[];
  allowCustom?: boolean; // Para habilitar opciones personalizadas
}

export type Select = Record<string, SelectOption>;
