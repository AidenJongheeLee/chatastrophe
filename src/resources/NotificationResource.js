export default class NotificationResource {
	allTokens = [];
	tokensLoaded = false;

	constructor(messaging, database) {
		this.database = database;
		this.messaging = messaging;
		try {
			this.messaging
				.requestPermission()
				.then(res => {
					console.log('permission granted');
				})
				.catch(err => {
					console.log('no access', err);
				});
		} catch (err) {
			console.log('No notification support', err);
		}
		this.setupTokenRefresh();
		this.database.ref('/fcmTokens').on('value', snapshot => {
			this.allTokens = snapshot.val();
			this.tokensLoaded = true;
		});
	}

	setupTokenRefresh() {
		this.messaging.onTokenRefresh(() => {
			this.saveTokenToServer();
		});
	}

	saveTokenToServer() {
		//get token
		this.messaging.getToken().then(res => {
			//look for existing token
			if (this.tokensLoaded) {
				const existingToken = this.findingExistingToken(res);
				if (existingToken) {
					//if it exists, replace
				} else {
					//otherwise, create a new one
				}
			}
		});
	}

	findingExistingToken(tokenToSave) {
		for (let tokenKey in this.allTokens) {
			const token = this.allTokens[tokenKey].token;
			if (token === tokenToSave) {
				return tokenKey;
			}
		}
		return false;
	}
}
