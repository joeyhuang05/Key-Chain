// import { makeContractDeploy, broadcastTransaction } from '@stacks/transactions';
// import { readFileSync} from 'fs';
// 
// const clarityCode = readFileSync('../../KeyChain/contracts/KeyIssuance2.clar').toString();
// 
// const txOptions = {
//     contractName: 'KeyIssuance',
//     codeBody: clarityCode,
//     clarityVersion: 3,
//     senderKey: '0e7e8c6f65b90a123b776c0b7f64073e0de7e6bb37e5b8f8b7a2c68b3c0f9a08',
//     network: 'testnet'
// };
// 
// const transaction = await makeContractDeploy(txOptions);
// const response = await broadcastTransaction({ transaction, network: 'testnet' });
// console.log(response.txid);

import  { makeContractDeploy, broadcastTransaction } from '@stacks/transactions';
import { readFileSync } from 'fs';

const senderKey = '0e7e8c6f65b90a123b776c0b7f64073e0de7e6bb37e5b8f8b7a2c68b3c0f9a08';

// helper to deploy contracts
async function deployContract(contractName, [contractPath]) {
    const clarityCode = readFileSync(contractPath, 'utf-8');
    const txOptions = {
        contractName,
        codeBody: clarityCode,
        senderKey,
        network,
    };
    try {
        const transaction = await makeContractDeploy(txOptions);
        const response = await broadcastTransaction(transaction, 'testnet')

        if (response.error) {
            console.error(`Error deploying ${contractName}:`, response.error);
        } else {
            console.log(`${contractName} deployed successfully!`);
            console.log('Transaction ID:', response.txid);
            console.log('Contract Address:', `${response.contract-address}.${contractName}`);
        }
    } catch (error) {
        console.error(`Error deploying ${contractName}:`, error);
    }
}

// deploying KeyIssuance2
async function deployKeyIssuance2() {
    const contractname = 'KeyIssuance2';
    const contractpath = '../../KeyChain/contracts/KeyIssuance2.clar';
    await deployContract(contractname, contractPath)
}

// deploying KeyReader
async function deployKeyReader() {
    const contractName = 'KeyReader';
    const contractPath = '../../KeyChain/contracts/KeyReader.clar';
    await deployContract(contractName, contractPath);
}

// deploy both sequentially
async function deployBothContracts() {
    console.log('Deploying KeyIssuance...');
    await deployKeyIssuance2();

    console.log('Deploying KeyReader...');
    await deployKeyReader();
}

deployBothContracts();