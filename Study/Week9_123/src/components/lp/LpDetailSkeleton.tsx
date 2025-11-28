const LpDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-4xl mx-auto">

        <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2 mb-6">
          <div className="w-20 h-10 bg-gray-800 rounded-lg animate-pulse" />
          <div className="w-20 h-10 bg-gray-800 rounded-lg animate-pulse" />
          <div className="w-20 h-10 bg-gray-800 rounded-lg animate-pulse" />
        </div>

        {/* 제목 */}
        <div className="h-12 bg-gray-800 rounded-lg mb-4 animate-pulse" />

        {/* 정보들 */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />
          <div className="w-24 h-4 bg-gray-800 rounded animate-pulse" />
          <div className="w-40 h-4 bg-gray-800 rounded animate-pulse" />
          <div className="w-16 h-6 bg-gray-800 rounded animate-pulse" />
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="w-20 h-8 bg-gray-800 rounded-full animate-pulse" />
          <div className="w-24 h-8 bg-gray-800 rounded-full animate-pulse" />
          <div className="w-16 h-8 bg-gray-800 rounded-full animate-pulse" />
        </div>

        {/* 내용 */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-4/5" />
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-4/5" />
        </div>
      </div>
    </div>
  )
}

export default LpDetailSkeleton
