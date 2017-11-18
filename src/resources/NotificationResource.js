export default class NotificationResource {
	constructor(messaging) {
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
	}
}
