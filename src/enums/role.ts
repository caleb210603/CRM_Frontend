export enum Role {
    Administador = 1,
    Empleado = 2,
  }

  export function getRole(role: number | undefined): string {
    return role !== undefined ? Role[role] : "";
  }