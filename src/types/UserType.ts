interface UserType {
  id?: number;
  fullName: string | undefined;
  avatar: string | undefined;
  email: string | undefined;
  password: string;
  status: number;
  role: number;
  permission?: string[] | null;
  createdAt?: number;
}

export default UserType;
