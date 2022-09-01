const pkgJson = require('../package.json');

function getServiceVersion() {
    return {
        version: pkgJson.version
    }
}

module.exports = { getServiceVersion }