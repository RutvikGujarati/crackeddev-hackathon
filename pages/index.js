import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from './Components/Navbar'
import Front from './Front'
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [siweResult, setSiweResult] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showOtherComponents, setShowOtherComponents] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const currentAccounts = await ethereum.request({ method: 'eth_accounts' });

        if (currentAccounts && currentAccounts.length > 0) {
          setAccounts(currentAccounts);
          setIsWalletConnected(true);
        } else {
          setIsWalletConnected(false);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error.message);
        setIsWalletConnected(false);
      }
    };

    fetchAccounts();
  }, []);

  const siweSign = async (siweMessage) => {
    try {
      const from = accounts[0];
      const msg = `0x${Buffer.from(siweMessage, 'utf8').toString('hex')}`;
      const sign = await ethereum.request({
        method: 'personal_sign',
        params: [msg, from],
      });
      setSiweResult(sign);

      // If sign is successful, set showOtherComponents to true
      setShowOtherComponents(true);
    } catch (err) {
      console.error(err);
      setSiweResult(`Error: ${err.message}`);
    }
  };

  const handleConnectWallet = async () => {
    try {
      const currentAccounts = await ethereum.request({ method: 'eth_accounts' });

      if (currentAccounts && currentAccounts.length > 0) {
        setAccounts(currentAccounts);
        setIsWalletConnected(true);
      } else {
        setIsWalletConnected(false);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
      setIsWalletConnected(false);
    }
  };

  const handleSiweClick = async () => {
    const domain = window.location.host;
    const from = accounts[0];
    const siweMessage = `${domain} wants you to sign in with your Ethereum account:\n${from}\n\nI accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://${domain}\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z`;
    siweSign(siweMessage);
  };

  return (
    <div>
      {isWalletConnected ? (
        <>
          {showOtherComponents ? (
            <>
              {/* Render other components here */}
              <Navbar isWalletConnected={isWalletConnected} accounts={accounts}/>
              {/* <h2>Other Components</h2> */}
            </>
          ) : (
            <>
              <button className={styles.bt} onClick={handleSiweClick}>Sign In</button>
              <div>{siweResult}</div>
            </>
          )}
        </>
      ) : (
        <div>
          <button className={styles.bt} onClick={handleConnectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );

}
