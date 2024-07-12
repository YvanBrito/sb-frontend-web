import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { menuItems } from '../../utils/menuItems'

interface SideMenuProps {
  toggleSideMenu: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({
  toggleSideMenu,
}: SideMenuProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleClick = (path: string) => {
    window.innerWidth <= 768 && toggleSideMenu()
    navigate(path)
  }

  return (
    <div className="fixed z-10 left-0 top-0 bg-white h-screen md:mr-8 md:static md:w-96">
      <ul className="list-none p-0 mx-4 mt-24 md:mt-8">
        {menuItems
          .filter(
            ({ permission }) =>
              !permission || user?.permissions?.includes(permission),
          )
          .map(({ label, id, path, children }) => {
            if (!children)
              return (
                <li
                  className="mb-4 font-bold cursor-pointer hover:bg-slate-200"
                  key={id}
                >
                  <button
                    className="w-full text-left"
                    type="button"
                    onClick={() => handleClick(path)}
                  >
                    {label}
                  </button>
                </li>
              )
            return (
              <div key={id}>
                <li className="mb-4 font-bold cursor-pointer hover:bg-slate-200">
                  <button
                    className="w-full text-left"
                    type="button"
                    onClick={() => {
                      const el = document.querySelector<HTMLElement>(`ul#${id}`)
                      if (el) {
                        el.style.maxHeight =
                          el.style.maxHeight === '0px'
                            ? `${(children?.length || 0) * 70}px`
                            : '0px'
                      }
                    }}
                  >
                    {label}
                  </button>
                </li>
                <ul
                  id={id}
                  className="overflow-hidden"
                  style={{ maxHeight: '0px', transition: 'max-height 0.5s' }}
                >
                  {children?.map(
                    ({ label: childLabel, id: childId, path: childPath }) => (
                      <li
                        className="mb-4 ml-5 cursor-pointer hover:bg-slate-200"
                        key={childId}
                      >
                        <button
                          className="w-full text-left"
                          type="button"
                          onClick={() => handleClick(childPath)}
                        >
                          {childLabel}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )
          })}
      </ul>
    </div>
  )
}

export { SideMenu }
