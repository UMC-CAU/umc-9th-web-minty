import { type RouteObject} from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import ProtectedLayout from '../layouts/ProtectedLayout'
import Login from '../pages/login'
import Signup from '../pages/signup'
import MyPage from '../pages/mypage'
import GoogleCallback from '../pages/google-callback'
import Home from '../pages/Home'
import LpDetail from '../pages/LpDetail'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // PUBLIC ROUTES
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleCallback />,
      },

      // PROTECTED ROUTES
      {
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'mypage',
            element: <MyPage />,
          },
          {
            path: 'lp/:lpId',
            element: <LpDetail />,
          },
        ],
      },
    ],
  },
]
