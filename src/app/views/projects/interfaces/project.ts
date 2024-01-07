export interface Project {
  _id: string;
  user_id: User;
  name: string;
  init_date: string;
  end_date: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Item {
  description: string;
  value: number;
  offered_value?: number;
}

