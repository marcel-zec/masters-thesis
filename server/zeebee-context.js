const { ZBClient } = require('zeebe-node')
const zbc = new ZBClient('localhost', { loglevel: 'ERROR' });

module.exports = {
	zbc
}