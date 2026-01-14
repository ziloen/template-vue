import { z } from 'zod'

import { request } from '~/api'

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})

const postListSchema = z.array(postSchema)

export type Post = z.infer<typeof postSchema>

/**
 * 获取全部 Post
 * @returns
 */
export async function getPostListAPI() {
  return (
    await request.get<Post[]>('/posts', {
      responseSchema: postListSchema,
    })
  ).data
}
