export function afterDays (days) {
  let data = new Date()
  let timestamp = Date.parse(data)
  timestamp = timestamp / 1000
  timestamp = timestamp + days * 86400
  data.setTime(timestamp * 1000)
  timestamp = data.toLocaleDateString()
  return timestamp.replace(/\//g, '-')
}
