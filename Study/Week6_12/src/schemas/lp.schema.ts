import { z } from 'zod'

export const createLpSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  thumbnail: z.url({ message: '올바른 URL 형식을 입력해주세요' }),
  tags: z.string().optional(),
})

export type CreateLpFormData = z.infer<typeof createLpSchema>
