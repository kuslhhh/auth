import "dotenv/config"

export const env = {
   PORT: process.env.PORT || 5000,
   DATABASE_URL: process.env.DATABASE_URL!,
   ACCESS_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET!,
   REFRESH_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET!,
   ACCESS_EXPIRES_IN: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN || "15h"),
   REFRESH_EXPIRES_DAYS: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || "30d"),
   BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12")
}