import { Link } from 'react-router'
import type { Lp } from '../../types/lp'
import { HeartIcon } from '@heroicons/react/24/solid'
import { formatDate } from '../../utils/date'
import { UI } from '../../constants'

interface LpCardProps {
  lp: Lp
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <Link
      to={`/lp/${lp.id}`}
      className="relative block overflow-hidden rounded-lg shadow-lg aspect-square group cursor-pointer"
    >

      <img
        src={lp.thumbnail}
        alt={lp.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">

        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
          {lp.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-300">

          <span>{formatDate(lp.createdAt)}</span>

          <div className="flex items-center gap-1">
            <HeartIcon className="w-4 h-4 text-red-500" />
            <span>{lp.likes.length}</span>
          </div>
        </div>

        {lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {lp.tags.slice(0, UI.MAX_VISIBLE_TAGS).map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-800/80 text-gray-300 px-2 py-1 rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default LpCard
