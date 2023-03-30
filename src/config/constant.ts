// VITE_BASE_SERVICE_URL=http://localhost:3000/
// VITE_IMGBB_URL=https://api.imgbb.com/1/upload
// VITE_TINY_MCE_KEY=ysbemjqh7w2yf92nlkwryqseu5m72z6iec6dcal628cu1gih
// VITE_IMGBB_KEY=8f0596a70bbee9a51f1540d7daa47e1d
export enum ENV {
  TINY_MCE_KEY = "ysbemjqh7w2yf92nlkwryqseu5m72z6iec6dcal628cu1gih",
  IMGBB_KEY = "8f0596a70bbee9a51f1540d7daa47e1d",
}

export enum VITE_URL {
  IMGBB_URL = "https://api.imgbb.com/1/upload",
  BASE_API = "http://localhost:3000/",
}

export enum PostStatus {
  APPROVED = 1,
  PENDING = 2,
  REJECTED = 3,
}

export const POST_DEFAULT_VALUE = {
  title: "",
  slug: "",
  status: 2,
  hot: false,
  image: "",
  createdAt: new Date().getTime(),
};

export const CATEGORY_DEFAULT_VALUE = {
  name: "",
  slug: "",
  status: 2,
  createdAt: new Date().getTime(),
};
export enum CategoryStatus {
  APPROVED = 1,
  PENDING = 2,
  REJECTED = 3,
}

//
export enum UserStatus {
  ACTIVED = 1,
  PENDING = 2,
  BANNED = 3,
}

export enum UserRole {
  ADMIN = 1,
  MOD = 2,
  USER = 3,
}

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
