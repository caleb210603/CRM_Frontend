export enum CategoryType {
    PRODUCTO = 0,
    SERVICIO = 1,
  }

  export function getCategoryType(type: number | undefined): string {
    return type !== undefined ? CategoryType[type] : "";
  }