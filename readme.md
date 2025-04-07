### Push Notifications
- Check if push permissions are granted
- Request push permissions
- Subscribe to push notifications
- unsubscribe to push notifications

## Installation

```bash
npm install tapback.js
```

## Usage

### Basic Setup

```typescript
import { Tapback } from 'tabpack.js';

// Configure the API
Tapback.Client.setClientConfig({
  baseUrl: '/api',
  apiKey: 'your-api-key',
  debug: true
});
```

### Push Notifications

```typescript
// Check if push notifications are supported and permission status
const permissionStatus = Tapback.Notifications.checkPushPermission();
console.log(`Push permission status: ${permissionStatus}`);

// Request permission and subscribe
async function setupPushNotifications() {
  try {
    const permission = await Tapback.Notifications.requestPushPermission();

    if (permission === 'granted') {
      const result = await Tapback.Notifications.subscribeUserToPush(['marketing', 'updates']);

      if (result.success) {
        console.log('Subscribed to push notifications!');
      }
    }
  } catch (error) {
    console.error('Error setting up notifications:', error);
  }
}

// Unsubscribe from push notifications
async function unsubscribe() {
  const result = await Tapback.Notifications.unsubscribeFromPush();

  if (result.success) {
    console.log('Unsubscribed from push notifications');
  }
}
```

## Service Worker

The API requires a service worker file to be placed at the root of your project's public directory:

`public/notification-service-worker.js`

The service worker is automatically registered when subscribing to push notifications.

## API Reference

For full API documentation, see [API.md](./API.md).

## License

MIT
