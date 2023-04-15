module.exports = ({}) => ({
  name: '{{name.firstName}} {{name.lastName}}',
  email: rndEmailGen,
  mobile: '{{phone.phoneNumber}}',
  password: '{{internet.password}}',
});

function genRndNum() {
  return (~~(Math.random() * 1000000)).toString(30);
}

function rndEmailGen() {
  return genRndNum() + '@gmail.com'
}