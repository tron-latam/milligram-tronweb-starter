var fs = require('fs')
var path = require('path')
var Election = require('../build/contracts/Election')

const address = Election.networks['2'].address


const tronboxJs = require('../tronbox').networks.shasta
const config = {
  contractAddress: address,
  privateKey: tronboxJs.privateKey,
  fullHost: tronboxJs.fullHost
}

fs.writeFileSync(
    path.resolve(__dirname, '../src/contract-config.js'),
    `const contractConfig = ${JSON.stringify(config, null, 2)}`
)

console.log('The app has been configured.')