import { useState, useEffect } from 'react';
import './Subscription.css'

const PushNotification = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [vapidKey, setVapidKey] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const fetchVapidKey = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/vapid/public-key');
        if (!response.ok) throw new Error('Failed to fetch VAPID public key');
        const key = await response.text();
        setVapidKey(key);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    const checkSubscriptionStatus = async () => {
      if (!('serviceWorker' in navigator)) {
        setErrorMessage('Service Workers are not supported in this browser.');
        return;
      }

      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
            const token = localStorage.getItem('token'); // Retrieve JWT token
            const response = await fetch(
              'http://localhost:8080/api/subscription-status',
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const result = await response.json();
            setIsSubscribed(result.isSubscribed);
          } else if (Notification.permission === 'default') {
            setShowPrompt(true);
          }
        }
      } catch {
        setErrorMessage('Error checking subscription status.');
      }
    };

    fetchVapidKey();
    checkSubscriptionStatus();
  }, []);

  const subscribeToNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const subscriptionData = {
        endpoint: subscription.endpoint,
        p256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
        auth: arrayBufferToBase64(subscription.getKey('auth')),
      };

      const token = localStorage.getItem('token'); // Retrieve JWT token

      const checkResponse = await fetch(
        `http://localhost:8080/api/check-subscription?endpoint=${subscription.endpoint}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const checkResult = await checkResponse.json();

      if (checkResult.exists) {
        setErrorMessage('This device/browser is already subscribed.');
        return;
      }

      const response = await fetch('http://localhost:8080/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        setIsSubscribed(true);
      } else {
        setErrorMessage('Failed to save subscription.');
      }
    } catch {
      setErrorMessage('Error during subscription.');
    }
  };

  const unsubscribeFromNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        const endpoint = subscription.endpoint;

        await subscription.unsubscribe();

        const token = localStorage.getItem('token'); // Retrieve JWT token

        const response = await fetch('http://localhost:8080/api/unsubscribe', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ endpoint }),
        });

        if (response.ok) {
          setIsSubscribed(false);
        } else {
          setErrorMessage('Failed to unsubscribe.');
        }
      }
    } catch {
      setErrorMessage('Error during unsubscription.');
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };

  const arrayBufferToBase64 = (buffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  };

  return (
    <div className="push-notification">
      <h2>Push Notifications</h2>
      {isSubscribed ? (
        <>
          <p>You are subscribed to notifications.</p>
          <button onClick={unsubscribeFromNotifications}>Unsubscribe</button>
        </>
      ) : (
        <>
          <button onClick={() => setShowPrompt(true)}>Subscribe to Notifications</button>
          {showPrompt && (
            <div className="modal">
              <p>Would you like to enable push notifications?</p>
              <button onClick={() => subscribeToNotifications()}>Yes</button>
              <button onClick={() => setShowPrompt(false)}>No</button>
            </div>
          )}
        </>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default PushNotification;
