import React, { useEffect, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const LoginPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for pending sign-in or if the user is already signed in
  useEffect(() => {
    const handleSignIn = async () => {
      if (userSession.isSignInPending()) {
        try {
          const user = await userSession.handlePendingSignIn();
          setUserData(user);
          setLoading(false);
          // Redirect or perform action on successful login
          console.log('User signed in:', user);
        } catch (error) {
          console.error('Sign-in error:', error);
          setLoading(false);
        }
      } else if (userSession.isUserSignedIn()) {
        const user = userSession.loadUserData();
        setUserData(user);
        setLoading(false);
        // Redirect or perform action since user is already signed in
        console.log('User already signed in:', user);
      } else {
        setLoading(false);
      }
    };

    handleSignIn();
  }, []);

  const signIn = () => {
    const redirectTo = "https://google.com";
    const appIcon = `${window.location.origin}/logo.png`;
    showConnect({
      redirectTo,
      appDetails: {
        name: 'KeyChain', // Replace with your app name
        icon: appIcon,
      },
      userSession,
    });
  };

  const signOut = () => {
    userSession.signUserOut();
    setUserData(null); // Clear user data on sign-out
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Stacks Authentication</h1>

      {userData ? (
        <div>
          <h2>Welcome, {userData.profile.name || 'User'}</h2>
          <p>Your Stacks address: {userData.profile.stxAddress}</p>
          <button onClick={signOut} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <button onClick={signIn} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Sign In with Stacks
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;