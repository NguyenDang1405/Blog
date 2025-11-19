'use client'

import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
import { useAuth } from '../contexts/AuthContext'

interface CommentsProps {
  postId: Id<"posts">
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState(user?.name || '')
  const [authorEmail, setAuthorEmail] = useState(user?.email || '')
  const [replyingTo, setReplyingTo] = useState<Id<"comments"> | null>(null)
  const [loading, setLoading] = useState(false)

  const comments = useQuery(api.comments.getCommentsByPostId, { postId }) || []
  const createComment = useMutation(api.comments.createComment)
  const deleteComment = useMutation(api.comments.deleteComment)

  // Nhóm comments theo parent (để hiển thị reply)
  const topLevelComments = comments.filter(c => !c.parentId)
  const repliesMap = new Map<Id<"comments">, typeof comments>()
  comments.forEach(comment => {
    if (comment.parentId) {
      if (!repliesMap.has(comment.parentId)) {
        repliesMap.set(comment.parentId, [])
      }
      repliesMap.get(comment.parentId)!.push(comment)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      await createComment({
        postId,
        userId: user?._id,
        authorName: authorName || 'Ẩn danh',
        authorEmail: authorEmail || undefined,
        content: content.trim(),
        parentId: replyingTo || undefined,
      })
      setContent('')
      setReplyingTo(null)
    } catch (error) {
      console.error('Lỗi khi thêm comment:', error)
      alert('Có lỗi xảy ra khi thêm comment')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (commentId: Id<"comments">) => {
    if (!confirm('Bạn có chắc chắn muốn xóa comment này?')) return

    try {
      await deleteComment({
        id: commentId,
        userId: user?._id,
      })
    } catch (error) {
      console.error('Lỗi khi xóa comment:', error)
      alert('Có lỗi xảy ra khi xóa comment')
    }
  }

  const CommentItem = ({ comment, level = 0 }: { comment: typeof comments[0], level?: number }) => {
    const replies = repliesMap.get(comment._id) || []
    const canDelete = user && (user._id === comment.userId || user.role === 'admin')

    return (
      <div className={`${level > 0 ? 'ml-8 mt-4' : ''} border-l-2 border-gray-200 pl-4`}>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{comment.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            </div>
            {canDelete && (
              <button
                onClick={() => handleDelete(comment._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Xóa
              </button>
            )}
          </div>
          {!replyingTo && (
            <button
              onClick={() => {
                setReplyingTo(comment._id)
                setContent('')
              }}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Trả lời
            </button>
          )}
        </div>
        {replies.length > 0 && (
          <div className="mt-2">
            {replies.map(reply => (
              <CommentItem key={reply._id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Bình luận ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 rounded-lg p-6">
        {replyingTo && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-blue-700">
              Đang trả lời comment...
            </span>
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Hủy
            </button>
          </div>
        )}
        
        {!user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Tên của bạn *"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="Email (tùy chọn)"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={replyingTo ? "Viết phản hồi của bạn..." : "Viết bình luận của bạn..."}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Đang gửi...' : replyingTo ? 'Gửi phản hồi' : 'Gửi bình luận'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {topLevelComments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
        ) : (
          topLevelComments.map(comment => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  )
}

export default Comments

