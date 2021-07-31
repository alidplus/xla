const traverse = require("traverse");
const faker = require("faker");


module.exports = (app) => async ({ path, count = 1, template = {}, callback, del = true }) => {
  const Service = app.service(path)
  // if(del) {
  //   await Service.Model.deleteMany({})
  // }
  const createPromises = (new Array(count)).fill(0).map((x, i) => i).map(async (i) => {
    const data = Object.assign({}, template)
    traverse(data).forEach(function (node) {
      if(typeof node === 'string' && node.includes('{{')) this.update(faker.fake(node))
      if(typeof node === 'funcion') this.update(node())
    })
    const createdData = await Service.create(data)
    if(typeof callback === 'function') await callback (createdData, i)
    return createdData
  })
  return Promise.all(createPromises)
}