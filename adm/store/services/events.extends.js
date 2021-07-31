export default (ducks, serviceName) => {
  return  {
    consts: {
      eTypes: [
        { _id: 'goal', label: 'گل' },
        { _id: 'yc', label: 'کارت زرد' },
        { _id: 'rc', label: 'کارت قرمز' },
        { _id: 'timeUp', label: 'پایان بازی' }
      ]
    }
  }
}
