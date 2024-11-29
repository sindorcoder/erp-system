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

export interface DataTypes {
  title: string;
  courseId: number;
  attachment: {
    size: number;
    url: string;
    origName: string;
  };
}
export interface GetDataTypes {
  data:    Data;
  error:   null;
  success: boolean;
}

export interface Data {
  contracts: Contract[];
  total:     number;
  courses: Course[];
}

export interface Contract {
  id:         number;
  course:     Course;
  title:      string;
  attachment: Attachment;
  createdAt:  string;
}

export interface Attachment {
  url:      string;
  origName: string;
  size:     number;
}

export interface Course {
  id:        number;
  name:      string;
  createdAt: Date;
}
