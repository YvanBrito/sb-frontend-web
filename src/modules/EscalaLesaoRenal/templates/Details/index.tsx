import { Routes, Route, Link, useParams } from 'react-router-dom'
import NotFound from '../../../../pages/NotFound'
import { Status } from '../../pages/Status'
import { Profile } from '../../pages/Profile'
import { Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import { useGetPatient } from '../../hooks'
import { History } from '../../pages'

interface LinkTabProps {
  label?: string
  href: string
  value?: number
  element: React.ReactNode
}

const DetailsTemplate = () => {
  const { attendenceNumber } = useParams()

  const { isLoading, data: patient } = useGetPatient(attendenceNumber)

  const tabs: LinkTabProps[] = [
    {
      href: 'status',
      label: 'Status',
      value: 0,
      element: <Status isLoading={isLoading} patient={patient} />,
    },
    {
      href: 'perfil',
      label: 'Perfil',
      value: 1,
      element: <Profile isLoading={isLoading} patient={patient} />,
    },
    {
      href: 'historico',
      label: 'Histórico',
      value: 2,
      element: <History isLoading={isLoading} patient={patient} />,
    },
  ]

  const [value, setValue] = useState(() => {
    const path = window.location.pathname.split('/').reverse()[0]
    const tab = tabs.find((t) => t.href === path)
    return tab?.value
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
  }

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        {tabs.map(({ href, label }: LinkTabProps) => (
          <Tab key={href} label={<Link to={href}>{label}</Link>} />
        ))}
      </Tabs>
      <Routes>
        {tabs.map(({ href, element }: LinkTabProps) => (
          <Route key={href} path={`/${href}`} element={element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export { DetailsTemplate }
