import {z} from "zod"

const PASSREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

export const authSchema = z.object({
   email: z.email({message: "Invalid email address"}),
   password: z.string().regex(PASSREGEX)
})