export interface Course {
  id: number;
  name: string;
  code: string;
  color: string;
  progress: number;
  next: string;
}

export interface Task {
  id: number;
  title: string;
  course: string;
  due: string;
  type: string;
  done: boolean;
}

export interface Dashboard {
  courses: Course[];
  tasks: Task[];
}

export interface User {
  id?: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
