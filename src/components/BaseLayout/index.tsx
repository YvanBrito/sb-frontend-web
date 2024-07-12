import { useState } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { SideMenu } from '../SideMenu'

interface IBaseLayoutProps {
  children: React.ReactElement
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({
  children,
}: IBaseLayoutProps) => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(
    window.innerWidth > 768,
  )

  const toggleSideMenu = () => {
    setShowSideMenu((oldState) => !oldState)
  }

  return (
    <div className="mx-8 md:mx-16">
      <Header toggleSideMenu={toggleSideMenu} />
      <div className="flex">
        {showSideMenu && (
          <>
            <div
              onClick={toggleSideMenu}
              className="fixed z-10 left-0 top-0 right-0 bottom-0 bg-[#0000006f] md:static"
            ></div>
            <SideMenu toggleSideMenu={toggleSideMenu} />
          </>
        )}
        <main className="w-full">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export { BaseLayout }
