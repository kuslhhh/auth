export type User = {
   id: string,
   email: string,
   name?: string,
   role: "USER" | "ADMIN",
   emailVerified: boolean,
   createdAt: string
}

export type AuthResponse = {
   accessToken: string;
   user: User;
}