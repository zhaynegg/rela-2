import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import EvolutionTree from "./pages/EvolutionTree"
import UserSearchingSystem from "./pages/UserSearchingSystem"
import ProtectedRoute from "./components/ProtectedRoute"
import InteractiveGames from "./pages/InteractiveGames"

// Games
import FirstMade from "./pages/games/FirstMade"
import Quiz from "./pages/games/Quiz"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserSearchingSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/evolution-tree"
          element={
            <ProtectedRoute>
              <EvolutionTree />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interactive-games"
          element={
            <ProtectedRoute>
              <InteractiveGames />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game-1"
          element={
            <ProtectedRoute>
              <FirstMade />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game-2"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App