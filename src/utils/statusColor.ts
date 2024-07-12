export function statusColor(status: string) {
  return status === 'HIGH'
    ? '#e32d2d'
    : status === 'MODERATE'
    ? '#f2d338'
    : '#47a14a'
}
