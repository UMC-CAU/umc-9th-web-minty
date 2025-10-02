interface CastCardProps {
  name: string
  role: string
  profilePath: string | null
}

function CastCard({ name, role, profilePath }: CastCardProps) {
  return (
    <article className="text-center">
      <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-2">
        {profilePath ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${profilePath}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            이미지 없음
          </div>
        )}
      </div>
      <p className="font-semibold text-sm text-gray-900">{name}</p>
      <p className="text-xs text-gray-600">{role}</p>
    </article>
  )
}

export default CastCard
