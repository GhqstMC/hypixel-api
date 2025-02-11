const c = require('centra')

module.exports = async (p1, p2) => {
	const targetType = (p2 ? p1 : 'uuid')
	const identifier = (p2 ? p2 : p1)

	let targetUUID = (targetType === 'uuid' ? identifier : null)

	if (targetType === 'name') {
		let playerResolution = await c('https://playerdb.co/api/player/minecraft/' + identifier, 'GET').send()

		if (playerResolution.statusCode === 200) {
			let body
			try {
				body = JSON.parse(playerResolution.body)
			}
			catch (err) {
				throw new Error('Invalid response recieved from Mojang UUID resolution endpoint.')
			}

			if (body.success) {
				targetUUID = body.data.player.id
			}
			else {
				throw new Error('Player does not exist.')
			}
		}
		else {
			throw new Error('Unexpected HTTP status code from Mojang UUID resolution endpoint.')
		}
	}

	return targetUUID
}
