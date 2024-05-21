import dayjs from 'dayjs'

String.prototype.truncate = function (num: number) {
  if (this.length > num) {
    return (this.slice(0, num) + '...') as string
  } else {
    return this as string
  }
}

String.prototype.prettyMoney = function () {
  return this.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

String.prototype.prettyDate = function () {
  return dayjs(String(this)).format('DD/MM/YYYY')
}

String.prototype.formatPhoneNumber = function () {
  // Replace the first character (0) with the country code (+84)
  let formattedNumber = '+84' + this.slice(1)

  return formattedNumber as any
}

String.prototype.prettyDateTime = function () {
  return dayjs(String(this)).format('DD/MM/YYYY - hh:mm:ss')
}

Array.prototype.has = function (item) {
  if (!isEqualNoop) throw new Error('Missing isEqualKey!')
  return this.some(currentItem => isEqualNoop(item, currentItem))
}

const isEqualNoop = (a: any, b: any) => {
  return a?.id === b?.id
}

export { isEqualNoop as isEqual }
