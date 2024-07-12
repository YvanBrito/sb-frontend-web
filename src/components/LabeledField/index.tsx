interface LabeledFieldProps {
  label: string
  children: React.ReactNode
}

const LabeledField = ({ label, children }: LabeledFieldProps) => {
  return (
    <div>
      <div className="text-xs font-bold">{label}</div>
      <div className="">{children}</div>
    </div>
  )
}

export { LabeledField }
