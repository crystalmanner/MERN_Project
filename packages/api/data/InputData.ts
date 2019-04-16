import { ModelType, DocType } from "app/controllers/api";
import { GREATERTHAN, LESSTHAN, ASC, DESC } from "../config/staticData";

const Create = 'create';
const Read = 'read';
const Update = 'update';
const Delete = 'delete';

interface WhereUniqueInput {
  id: string;
}
type WhereFilter = {
  field: string,
  operator: typeof GREATERTHAN | typeof LESSTHAN,
  maxValue: number,
  minValue: number,
  value? : number
}

type ReadSort = {
  field: string
  operator: typeof ASC | typeof DESC
}
export interface CreateInput {
  action: typeof Create,
  data: ModelType[] | DocType[];
}

export interface ReadInput {
  action: typeof Read;
  model: string;
  fields?: string[]
  where?: WhereFilter[];
  sort?: ReadSort[]
}

export interface UpdateInput {
  action: typeof Update;
  model: string;
  where: WhereUniqueInput;
  data?: any;
}

export type DeleteInput = {
  action: typeof Delete;
  model: string;
  where: WhereUniqueInput;
}
