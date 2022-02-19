export type MenuOption = {
  id: string
  description: string
  route: Nullable<string>
  parent: string
  status: string
  update_at: Date
  create_at: Date
  id_actividad: string
  user_update: string
  user_insert: string
  CHILDREN:MenuOption[]
}
export type SelectConditionType = {
  field: string;
  operator: string;
  condition: string | number;
};
export type Nullable<T> = T | null

export type PaginationType = {
  take: number;
  skip: number;
};
export type DateType = {
  hour: string;
  date: string;
};