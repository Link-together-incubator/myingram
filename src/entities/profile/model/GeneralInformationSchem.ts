import { z } from 'zod'

export const GeneralInformationSchema = z.object({
  userName: z
    .string()
    .regex(/^[0-9A-Za-z_-]+$/, {
      message: 'Valid characters are 0-9, A-Z, a-z, _ , -',
    })
    .min(6, { message: 'Minimum number of characters 6' })
    .max(30, { message: 'Maximum number of characters 30' }),
  firstName: z
    .string()
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: 'Valid characters are A-Z, a-z, А-Я, а-я',
    })
    .min(1, { message: 'Minimum number of characters 1' })
    .max(50, { message: 'Maximum number of characters 50' }),
  lastName: z
    .string()
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: 'Valid characters are A-Z, a-z, А-Я, а-я',
    })
    .min(1, { message: 'Minimum number of characters 1' })
    .max(50, { message: 'Maximum number of characters 50' }),
  dateOfBirth: z.string().optional(),
  country: z.string(),
  city: z.string(),
  aboutMe: z.string().max(200, { message: 'Maximum number of characters 200' }),
})

export type GeneralInformationData = z.infer<typeof GeneralInformationSchema>
