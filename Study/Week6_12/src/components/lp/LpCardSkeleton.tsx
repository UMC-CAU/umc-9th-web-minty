const LpCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square bg-gray-800">

      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent animate-shimmer"></div>
      </div>
    </div>
  )
}

export default LpCardSkeleton
