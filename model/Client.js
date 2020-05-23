const path = require('path')
const c = require('centra')

const getUUIDFromTarget = require(path.join(__dirname, '..', 'utility', 'uuidTarget.js'))

const baseURL = 'https://api.hypixel.net/'

/**
* Main Client class. API keys are used to create client instances.
*/
class Client {
	/**
	* Create a new API client.
	* @param {string} key - A valid Hypixel API key
	*/
	constructor (key) {
		this.key = key
	}

	/**
	* Get a player's data.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getPlayer(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		const res = await c(baseURL).path('/player').query({
			'uuid': targetUUID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	async getSkyblockProfiles(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		const res = await c(baseURL).path('skyblock/profiles').query({
			'key': this.key,
			'uuid': targetUUID
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
	}

	/**
	* Get a player's Skyblock profile data.
	* @param {string} [profileID] Identifies the Skyblock Profile by its ID
	*/
	async getSkyBlockProfileData(profileID) {

		const res = await c(baseURL).path('/skyblock/profile').query({
			'key': this.key, 
			'profile': profileID
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}
	/**
	 * 
	 * @param {string} playerName Identifies the Player which added the Auction
	 * @param {string} profileID Identifies the Skyblock Profile by its ID 
	 */
	async getSkyblockPlayerAuction(playerName, profileID){
		let targetUUID = await getUUIDFromTarget(playerName)

		const res = await c(baseURL).path('/skyblock/auction').query({
			'key': this.key,
			'uuid': targetUUID,
			'profile': profileID
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed;
		}else throw new Error(parsed.cause || response)
	}
	/**
	 * 
	 * @param {int} AuctionPage Give the Auction Page; If not given will be replaced with 0 
	 */
	async getSkyblockAuctions(AuctionPage){
		if (AuctionPage == undefined) {
			AuctionPage = 0
		}
		const res = await c(baseURL).path('/skyblock/auctions').query({
			'key': this.key,
			'page': AuctionPage	
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed;
		}else throw new Error(parsed.cause || response)
	}

	/**
	 * Get the current Bazaar Information
	 */
	async getSkyblockBazaar() {
		const res = await c(baseURL).path('/skyblock/bazaar').query({
			'key': this.key
		}).send()
	
		const parsed = await res.json()
	
		if (parsed.success) {
			return parsed;
		}else throw new Error(parsed.cause || response)
	}

	/**
	 * Get all Bazaar Items currently available
	 * Note from the official API Documentation : This method is deprecated and will be removed at a later date.
	 */
	async getAllSkyblockBazaarItems(){
		const res = await c(baseURL).path('skyblock/bazaar/products').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed;
		}else throw new Error(parsed.cause || response)
	}

	/**
	 * 
	 * @param {string} ItemID give the ItemID to identifies the Item
	 * return Information about the Item
	 * Note from the official API Documentation : This method is deprecated and will be removed at a later date. 
	 */
	async getOneSkyblockBazaarItem(ItemID){
		const res = await c(baseURL).path('/skyblock/bazaar/product').query({
			'key': this.key,
			'productId': ItemID
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}else throw new Error(parsed.cause || response)
	}

	/**
	 * Get the lates Skyblock News including a title, description and a thread.
	 */
	async getSkyblockNews() {
		const res = await c(baseURL).path('skyblock/news').query({
			'key': this.key
		}).send()
		const parsed = await res.json()
	
		if (parsed.success) {
		return parsed
		}else throw new Error(parsed.cause || response)
	
	}

	/**
	* Get a session's data.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getSession(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		const res = await c(baseURL).path('/session').query({
			'uuid': targetUUID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get a player's friends.
	* @param {string} [targetType=uuid] - Target type. 'name' or 'uuid'
	* @param {string} identifier - Identifier for the target. (Either a name or UUID, based on targetType.)
	*/
	async getFriends(p1, p2) {
		let targetUUID = await getUUIDFromTarget(p1, p2)

		const res = await c(baseURL).path('/friends').query({
			'uuid': targetUUID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get a guild's data.
	* @param {string} guildID - ID of the guild. (Guilds can be searched with the Client.findGuild method.)
	*/
	async getGuild(guildID) {
		const res = await c(baseURL).path('/guild').query({
			'id': guildID,
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get a guild's ID.
	* @param {string} [targetType=name] - Target type. 'name' for guild name, 'member' for a member's UUID, or 'memberName' for a member's name
	* @param {string} identifier - Identifier for the target. (Either a name or player UUID, based on targetType.)
	*/
	async findGuild(targetType, identifier) {
		let targetIdentifier

		if (targetType === 'memberName') {
			targetIdentifier = await getUUIDFromTarget('name', identifier)
		}
		else {
			targetIdentifier = identifier
		}

		const query = {
			'key': this.key
		}

		if (targetType === 'name') {
			query['byName'] = targetIdentifier
		}
		else query['byUuid'] = targetIdentifier

		const res = await c(baseURL).path('/findGuild').query(query).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get Watchdog statistics.
	*/
	async getWatchdogStats() {
		const res = await c(baseURL).path('/watchdogstats').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get leaderboards.
	*/
	async getLeaderboards() {
		const res = await c(baseURL).path('/leaderboards').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get API key information.
	*/
	async getKey() {
		const res = await c(baseURL).path('/key').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}

	/**
	* Get network game boosters.
	*/
	async getBoosters() {
		const res = await c(baseURL).path('/boosters').query({
			'key': this.key
		}).send()

		const parsed = await res.json()

		if (parsed.success) {
			return parsed
		}
		else throw new Error(parsed.cause || response)
	}
}

module.exports = Client
