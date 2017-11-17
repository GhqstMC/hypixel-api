const HypixelAPI = require('./')

const client = new HypixelAPI('df18f867-e591-42d9-9472-805f1ab355d3')

client.getPlayer('uuid', '161debe7d49842408fc2405bfabc3fd4').then((player) => {
	console.log(player)
}).catch((err) => {
	console.error('Error: ' + err)
})
