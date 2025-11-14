const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 py-4">
      {/* 아바타 */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* 내용용 */}
      <div className="flex-1 space-y-2">
        {/* 이름+날짜 */}
        <div className="flex gap-2">
          <div className="relative w-20 h-4 rounded overflow-hidden bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="relative w-32 h-4 rounded overflow-hidden bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* 댓 내용 */}
        <div className="space-y-1.5">
          <div className="relative w-full h-4 rounded overflow-hidden bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="relative w-3/4 h-4 rounded overflow-hidden bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSkeleton
