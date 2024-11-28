export type FieldType = {
    login?: string;
    password?: string;
    kurs?: string;
    nomi?: string;
  };
  

  
export interface IInitialState {
  token: string | null
}

export interface DataType {
  key: string;
  name: string;
  age: number;
}