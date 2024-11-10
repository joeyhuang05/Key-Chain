import { makeContractDeploy, broadcastTransaction, principalCV, makeContractCall } from '@stacks/transactions';


import fs from 'fs';

import { readFileSync } from 'fs';
import pkg from '@stacks/network';
const { StacksTestnet } = pkg;


const network = StacksTestnet;

async function deployContract() {
    const senderKey = '0e7e8c6f65b90a123b776c0b7f64073e0de7e6bb37e5b8f8b7a2c68b3c0f9a08'; //  private key
    const clarityCode = readFileSync('../../KeyChain/contracts/KeyIssuance2.clar').toString(); // Adjust path as needed

    const txOptions = {
        contractName: 'KeyIssuance2', //  contract name
        codeBody: clarityCode,
        senderKey: senderKey,
        network: 'testnet',
    };

    try {
        const transaction = await makeContractDeploy(txOptions);
        const response = await broadcastTransaction(transaction, network);
        console.log('Transaction ID:', response.txid);
        console.log('Contract Address:', response.contract_address);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

deployContract();

