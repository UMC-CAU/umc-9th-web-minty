import { Link } from 'react-router'
import { PlusIcon } from '@heroicons/react/24/solid'

const CreateLpButton = () => {
  return (
    <Link
      to="/lp/create"
      className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="새 LP 만들기"
    >
      <PlusIcon className="w-6 h-6" />
    </Link>
  )
}

export default CreateLpButton
