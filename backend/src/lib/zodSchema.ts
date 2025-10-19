import z from "zod"

const PASSWORD_REGEX = /^(?=.{8,128}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).*$/;

export const registerSchema = z.object({
   name: z.string().max(15).min(3).optional(),
   email: z.string().email(),
   password: z.string().regex(PASSWORD_REGEX)
})

export const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().regex(PASSWORD_REGEX)
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
