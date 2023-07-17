// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace cadastreModel {

  export interface cadastre {
    id: number | null,
    name: string | null,
    cpf: string | null,
    born: Date | null
  }
}

export default cadastreModel
