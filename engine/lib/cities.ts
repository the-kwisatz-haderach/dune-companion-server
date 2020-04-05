export interface City {
  name: string
  description: string
  specialRules: []
}

const cities: { [cityId: number]: City } = {
  0: {
    name: 'Arrakeen',
    description: '',
    specialRules: []
  },
  1: {
    name: 'Carthag',
    description: '',
    specialRules: []
  },
  2: {
    name: 'Tueks Sietch',
    description: '',
    specialRules: []
  }
}

export default cities
