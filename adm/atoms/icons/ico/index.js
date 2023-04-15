const kebabCase = require('lodash/kebabCase')
const startCase = require('lodash/startCase')
const grab = require('./grab')
const fs = require('fs')
const path = require('path')
const dist = path.join(__dirname, 'out.txt')
try {
  fs.unlinkSync(dist);
} catch (e) {
  console.log('...')
} finally {
  generate(grab)
}

async function generate(iconsList) {
  for (let clss of iconsList) {
    const [type, ...rest] = clss.split(' ')
    const cls = rest.join('')
    let suffix = ''
    if (type === 'fab') suffix = 'Brand'
    if (type === 'far') suffix = 'Regular'
    if (type === 'fal') suffix = 'Light'
    if (type === 'fad') suffix = 'Duotone'
    const compName = startCase(cls.replace('fa-', '')).replace(/\s/g, '')
    let prefix = isNaN(+compName.charAt(0)) ? '' : 'I'
    console.log(compName, ':', cls)
    const line = `export const ${prefix}${compName}${suffix} = (p) => <i className={classnames("${clss}", iconOptions(p), p.className)}/>`
    await fs.appendFileSync(dist,  line + "\n")
  }
}
