export enum Gender {
    Mujer = 0,
    Hombre = 1,
    PrefieroNoDecirlo = 2,
  }

  export function getGender(gender: number | undefined): string {
    return gender !== undefined ? Gender[gender] : "";
  }