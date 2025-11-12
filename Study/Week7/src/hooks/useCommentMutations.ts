import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { createComment, deleteComment, updateComment } from '../api/comment'
import type {
  CreateCommentRequest,
  UpdateCommentRequest,
  Comment,
  CommentListResponse,
} from '../types/comment'
import { QUERY_KEYS } from '../constants/query-keys'
import { useAuth } from '../contexts/AuthContext'

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(data),

    onMutate: async (newComment) => {

      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.comments.list({ lpId: newComment.lpId }),
      })

      // 이전 상태
      const previousComments = queryClient.getQueryData(
        QUERY_KEYS.comments.list({ lpId: newComment.lpId })
      )

      // 낙관적 업데이트
      if (user) {
        queryClient.setQueryData<InfiniteData<CommentListResponse>>(
          QUERY_KEYS.comments.list({ lpId: newComment.lpId }),
          (old) => {
            if (!old) return old

            const optimisticComment: Comment = {
              id: Date.now(),
              content: newComment.content,
              lpId: newComment.lpId,
              authorId: user.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              author: {
                id: user.id,
                name: user.name,
                email: user.email,
                bio: user.bio || null,
                avatar: user.avatar || null,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
            }

            const newPages = old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  data: {
                    ...page.data,
                    data: [optimisticComment, ...page.data.data],
                  },
                }
              }
              return page
            })

            return {
              ...old,
              pages: newPages,
            }
          }
        )
      }

      return { previousComments }
    },

    onError: (_err, newComment, context) => {
      // 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(
          QUERY_KEYS.comments.list({ lpId: newComment.lpId }),
          context.previousComments
        )
      }
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.')
    },

    onSettled: (_, __, variables) => {
      // 재동기화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.list({ lpId: variables.lpId }),
      })
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateCommentRequest) => updateComment(data),

    onMutate: async (updatedComment) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.comments.list({ lpId: updatedComment.lpId }),
      })

      // 이전 상태
      const previousComments = queryClient.getQueryData(
        QUERY_KEYS.comments.list({ lpId: updatedComment.lpId })
      )

      // 낙관적 업데이트
      queryClient.setQueryData<InfiniteData<CommentListResponse>>(
        QUERY_KEYS.comments.list({ lpId: updatedComment.lpId }),
        (old) => {
          if (!old) return old

          const newPages = old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map((comment) =>
                comment.id === updatedComment.commentId
                  ? {
                      ...comment,
                      content: updatedComment.content,
                      updatedAt: new Date().toISOString(),
                    }
                  : comment
              ),
            },
          }))

          return {
            ...old,
            pages: newPages,
          }
        }
      )

      return { previousComments }
    },

    onError: (_err, variables, context) => {
      // 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(
          QUERY_KEYS.comments.list({ lpId: variables.lpId }),
          context.previousComments
        )
      }
      alert('댓글 수정에 실패했습니다. 다시 시도해주세요.')
    },

    onSettled: (_, __, variables) => {

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.list({ lpId: variables.lpId }),
      })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lpId, commentId }: { lpId: number; commentId: number }) =>
      deleteComment(lpId, commentId),

    onMutate: async ({ lpId, commentId }) => {

      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.comments.list({ lpId }),
      })

      const previousComments = queryClient.getQueryData(
        QUERY_KEYS.comments.list({ lpId })
      )

      queryClient.setQueryData<InfiniteData<CommentListResponse>>(
        QUERY_KEYS.comments.list({ lpId }),
        (old) => {
          if (!old) return old

          const newPages = old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.filter((comment) => comment.id !== commentId),
            },
          }))

          return {
            ...old,
            pages: newPages,
          }
        }
      )

      return { previousComments }
    },

    onError: (_err, variables, context) => {

      if (context?.previousComments) {
        queryClient.setQueryData(
          QUERY_KEYS.comments.list({ lpId: variables.lpId }),
          context.previousComments
        )
      }
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.')
    },

    onSettled: (_, __, variables) => {

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.comments.list({ lpId: variables.lpId }),
      })
    },
  })
}
