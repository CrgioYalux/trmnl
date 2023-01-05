const Langs = ["EN", "ES"] as const;

export type Lang = typeof Langs[number];
