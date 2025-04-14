interface SelectOption {
  name: string;
  value: string;
  options: string[];
}

export type Select = Record<string, SelectOption>;
