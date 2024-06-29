const timezone7 = 7 * 60 * 60 * 1000 //ms

export const getISOStringNow = () => {
  const time = new Date().getTime() + timezone7
  return new Date(time).toISOString()
}

export const getISOString = (date) => {
  const time = new Date(date).getTime() + timezone7
  return new Date(time).toISOString()
}

export const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN')
