export type User = {
   id: string,
   email: string,
   role: "USER" | "ADMIN"
}

export type AuthResponse = {
   accessToken: string;
   user: User;
}