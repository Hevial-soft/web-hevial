import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AccountPage } from './pages/AccountPage'
import { ReturnsPage } from './pages/ReturnsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
      </Routes>
    </BrowserRouter>
  )
}