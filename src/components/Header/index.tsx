import { GiHamburgerMenu } from 'react-icons/gi'
import logo from '../../assets/img/logo.png'
import { useAuth } from '../../hooks/auth'
import { useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useState } from 'react'

interface HeaderProps {
  toggleSideMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }: HeaderProps) => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false)

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <div className="flex justify-between items-center my-4">
      <GiHamburgerMenu onClick={() => toggleSideMenu()} />
      <img className="w-14" alt="logo" src={logo} />
      <div className="relative">
        <div
          onClick={() => setShowUserMenu((oldState) => !oldState)}
          className="flex gap-2 cursor-pointer"
        >
          <FaRegCircleUser className="text-2xl" />
          <span>{user?.email}</span>
        </div>
        {showUserMenu ? (
          <div className="absolute top-8 right-3 shadow-lg bg-white py-3">
            <button
              className="hover:bg-slate-200 w-32"
              type="button"
              onClick={handleSignOut}
            >
              Sair
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { Header }
