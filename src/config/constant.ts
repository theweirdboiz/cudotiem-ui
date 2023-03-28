export const postStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
};
export const POST_DEFAULT_VALUE = {
  title: "",
  slug: "",
  status: 2,
  hot: false,
  createdAt: new Date().getTime(),
};

export const CATEGORY_DEFAULT_VALUE = {
  name: "",
  slug: "",
  status: 2,
  createdAt: new Date().getTime(),
};

export const categoryStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
};
export const status = {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
};
//
export const userStatus = {
  ACTIVED: 1,
  PENDING: 2,
  BANED: 3,
};

export const userRole = {
  ADMIN: 1,
  MOD: 2,
  USER: 3,
};

export const USER_DEFAULT_VALUE = {
  fullName: "",
  email: "",
  avatar: "",
  password: "",
  status: 2,
  role: 3,
  createdAt: new Date().getTime(),
};
export const TOKEN_KEY = "token";
export const USER_KEY = "user";
