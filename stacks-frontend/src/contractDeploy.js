import { makeContractDeploy, broadcastTransaction } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network'
import fs from 'fs';

const network = new StacksTestnet();
const clarityCode = fs.readFileSync('./KeyIssuance2.clar', 'utf-8');

async function deployContract(){
    const senderKey = 'user-private-key';
    const txOptions = {
        contractName: 'your-contract-name',
        codyBody: clarityCode,
        senderKey: senderKedr,
        network: network,
    };

    try {
        const transaction = await makeContractDeploy(txOptions);
        const response = await broadcastTransaction(transaction, network);
        console.log('Trasanction ID:', responsetxid);
        console.log('Contract Addresses:', response.contract_address)
    }}