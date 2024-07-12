interface IEgrfParams {
  isBlack: boolean
  gender: string
  creatinine: number
  age: number
}

export function calcEgrf({ isBlack, gender, creatinine, age }: IEgrfParams) {
  let egfr = 0
  if (isBlack) {
    if (gender === 'Mulher') {
      if (creatinine <= 0.7) {
        console.log('1')
        egfr = 166 * Math.pow(creatinine / 0.7, -0.329) * Math.pow(0.993, age)
      } else {
        console.log('2')
        egfr = 166 * Math.pow(creatinine / 0.7, -1.209) * Math.pow(0.993, age)
      }
    } else {
      if (creatinine <= 0.9) {
        console.log('3')
        egfr = 163 * Math.pow(creatinine / 0.9, -0.411) * Math.pow(0.993, age)
      } else {
        console.log('4')
        egfr = 163 * Math.pow(creatinine / 0.9, -1.209) * Math.pow(0.993, age)
      }
    }
  } else {
    if (gender === 'Mulher') {
      if (creatinine <= 0.7) {
        egfr = 144 * Math.pow(creatinine / 0.7, -0.329) * Math.pow(0.993, age)
      } else {
        egfr = 144 * Math.pow(creatinine / 0.7, -1.209) * Math.pow(0.993, age)
      }
    } else {
      if (creatinine <= 0.9) {
        egfr = 141 * Math.pow(creatinine / 0.9, -0.411) * Math.pow(0.993, age)
      } else {
        egfr = 141 * Math.pow(creatinine / 0.9, -1.209) * Math.pow(0.993, age)
      }
    }
  }
  return egfr
}
