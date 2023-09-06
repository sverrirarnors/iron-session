type YearMap = {
  [key: string]: string
}

const yearMap: YearMap = {
  A_1_: 'Fyrsta',
  A_2_: 'Annað',
  A_3_: 'Þriðja',
}

export const yearToString = (key: string): string => {
  if (key in yearMap) {
    return `${yearMap[key]}`
  }
  return '-'
}

const yearNumberMap: YearMap = {
  A_1_: '1.',
  A_2_: '2.',
  A_3_: '3.',
}

export const yearToNumberString = (key: string): '1.' | '2.' | '3.' | '-' => {
  if (key in yearNumberMap) {
    return `${yearNumberMap[key]}` as '1.' | '2.' | '3.'
  }
  return '-' as '-'
}
