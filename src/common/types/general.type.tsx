export type MenuOption = {
    LEVEL: number
    NAME: string | JSX.Element
    ID: string
    PARENT: string
    MODULE: Nullable<string>
    CHILDREN?: MenuOption[]
  }


  export type Nullable<T> = T | null