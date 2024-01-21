// Authentication.js
import React, { useState } from 'react';
import getWeb3 from './web3';

const Authentication = ({ onConnect }) => {
  const [isConnected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const web3 = await getWeb3();
      // Get user's Ethereum address
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      if (userAddress) {
        setConnected(true);
        onConnect(userAddress);
      } else {
        console.error('No Ethereum accounts found');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <p>Connected Wallet</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Authentication;
