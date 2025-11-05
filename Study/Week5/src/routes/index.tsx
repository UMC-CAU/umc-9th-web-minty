import { type RouteObject, Navigate } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import ProtectedLayout from '../layouts/ProtectedLayout'
import Login from '../pages/login'
import Signup from '../pages/signup'
import MyPage from '../pages/mypage'
import GoogleCallback from '../pages/google-callback'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // 기본 경로
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },

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
            path: 'mypage',
            element: <MyPage />,
          },
          
        ],
      },
    ],
  },
]
