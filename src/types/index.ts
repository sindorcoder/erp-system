export type FieldType = {
    login?: string;
    password?: string;
    title?: string;
    courseId?: number;
    files?: string;
    course?: string;
  };
  

  
export interface IInitialState {
  token: string | null
}

export interface DataType {
  key: string;
  name: string;
  age: number;
  course: string;
  files: string;
}