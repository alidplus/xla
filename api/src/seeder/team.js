module.exports = ({sponsor, owner}) => ({
  title: {
    fa: '{{name.firstName}} فارسی',
    en: '{{address.cityName}} team',
    abr: createAbr,
  },
  owner: owner._id,
  sponsor: sponsor._id,
});

function createAbr() {
  const rndThreeDigitNumber = Math.floor(100 + Math.random() * 900);
  // console.log(rndThreeDigitNumber);
  return String(rndThreeDigitNumber);
}
