// Listen for the push event to handle incoming push notifications
self.addEventListener('push', (event) => {
  try {
    // Parse the incoming push data as JSON
    const data = event.data.json();
    console.log('Push data:', data); // Log the data for debugging

    // Check if the necessary data (body) is present
    if (!data || !data.body) {
      console.warn('Received invalid push data:', data);
      return; // Don't show the notification if data is invalid
    }

    // Extract title and body from the push data, with default values if not provided
    const title = data.title || 'Notification';
    const options = {
      body: data.body, 
      icon: 'icon.png', // Optional: Path to notification icon
      data: {
        url: data.url, // URL to open on notification click
      },
    };

    // Show the notification using the service worker's registration
    event.waitUntil(self.registration.showNotification(title, options));

  } catch (error) {
    console.error('Error handling push event:', error);
  }
});

// Listen for notification click events to open the specified URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification when clicked

  // Retrieve the URL from the notification's data
  const url = event.notification.data.url;

  // Check if a valid URL is available
  if (url && isValidUrl(url)) {
    // Use self.clients to open the URL in a new window/tab
    event.waitUntil(self.clients.openWindow(url));
  } else {
    console.warn('No valid URL found in notification data:', url);
  }
});

// Helper function to validate URLs
function isValidUrl(url) {
  try {
    new URL(url); // Attempt to create a URL object
    return true; // Return true if the URL is valid
  } catch {
    return false; // Return false if URL creation fails
  }
}

// Service worker installation event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(self.skipWaiting()); // Activate the service worker immediately
});

// Service worker activation event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim()); // Immediately take control of clients
});

// Force update check (optional)
if (navigator.serviceWorker && navigator.serviceWorker.controller) {
  navigator.serviceWorker.controller.addEventListener('statechange', (event) => {
    if (event.target.state === 'activated') {
      console.log('Service Worker updated');
    }
  });
}
