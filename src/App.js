import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const savedAccount = localStorage.getItem('account');
        if (savedAccount) {
            setAccount(savedAccount);
            getBalance(savedAccount);
        }
    }, []);

    const connectWallet = async () => {
        setMessage('');
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                localStorage.setItem('account', accounts[0]);
                getBalance(accounts[0]);
                setMessage('Wallet connected successfully');
            } catch (error) {
                console.error("User denied account access");
                setMessage('Connection failed: User denied account access');
            }
        } else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            localStorage.setItem('account', accounts[0]);
            getBalance(accounts[0]);
            setMessage('Wallet connected successfully');
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            setMessage('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    const disconnectWallet = () => {
        setAccount('');
        localStorage.removeItem('account');
        setMessage('Wallet disconnected successfully');
    };

    const getBalance = async (account) => {
        if (account) {
            const web3 = new Web3(window.ethereum);
            const balanceWei = await web3.eth.getBalance(account);
            const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            setBalance(balanceEth);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>3connect-wallet</h1>
                {account ? (
                    <>
                        <button className="wallet-connected" onClick={disconnectWallet}>Disconnect Wallet</button>
                        <p>Connected account: {account}</p>
                        <p>Balance: {balance} ETH</p>
                    </>
                ) : (
                    <button className="wallet-connect" onClick={connectWallet}>Connect Wallet</button>
                )}
                {message && <p className="message">{message}</p>}
            </header>
            <footer>
                © 2024 Hossam. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
