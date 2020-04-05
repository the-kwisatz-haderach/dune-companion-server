interface Phase {
  name: string
  description: string
}

const phases: { [phaseId: number]: Phase } = {
  0: {
    name: 'Storm',
    description: ''
  }
}

export default phases
