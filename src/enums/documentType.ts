export enum DocumentType {
    DNI = 0,
    Cedula = 1,
    Pasaporte = 2,
    Otros = 3,
  }

  export function getDocumentType(type: number | undefined): string {
    return type !== undefined ? DocumentType[type] : "";
  }