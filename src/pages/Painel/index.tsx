import { PanelCard } from '../../components'
import { useAuth } from '../../hooks/auth'
import { panelItems } from '../../utils/menuItems'

const Painel: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {panelItems
        .filter(
          ({ permission }) =>
            !permission || user?.permissions?.includes(permission),
        )
        .map(({ label, path, description }) => {
          return (
            <PanelCard
              key={label}
              label={label}
              description={description}
              path={path}
            />
          )
        })}
    </div>
  )
}

export { Painel }
