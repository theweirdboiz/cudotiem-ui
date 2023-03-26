interface UserType {
  id: number | null;
  fullName: string | "";
  avatar: string | null | undefined;
  email: string | null;
  password: string | null;
  address: string | null;
  status: number | null;
  role: number | null;
  permission: [] | null;
  createdAt: number | null;
}

export default UserType;
