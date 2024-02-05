import { MesaType } from "./QuartoMesa";

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
  status?: Status;
};

export type TagOpenSearchType = {
  id?: number;
  numero: string;
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

export type TagComandaType = {
  id?: number;
  numero: number;
  codigoMesa: number;
  quartoMesa: MesaType;
};