import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ user, children }: any) {

  if (user.role === "GUEST") {
    return <Navigate to='/catalog' />
  }

  return (
    children
  )
}
