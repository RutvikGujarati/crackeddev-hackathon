// web3.js
import Web3 from 'web3';

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for window to load
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        // Legacy dapp browsers
        const web3 = new Web3(window.web3.currentProvider);
        resolve(web3);
      } else {
        // Non-dapp browsers
        reject(new Error('MetaMask is not installed'));
      }
    });
  });
};

export default getWeb3;
