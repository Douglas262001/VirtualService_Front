export type TagType = {
  id?: number;
  numero: number;
  codigoQrCode?: string;
  status: Status;
};

export type TagSearchType = {
  id?: number;
  numero: string;
  codigoQrCode?: string;
  status: Status;
};

export enum Status {
  Bloqueada = 0,
  Liberada = 1,
  Ocupada = 2,
}

export const EnumStatusTag = new Map<number, string>([
  [Status.Bloqueada, "Bloqueada"],
  [Status.Liberada, "Liberada"],
  [Status.Ocupada, "Em uso"],
]);
