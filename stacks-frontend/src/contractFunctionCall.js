import { makeContractCall, broadcastTransaction, uintCV} from "@stacks/transactions";
import { StacksTestnet } from '@stacks/network'

const network = new StacksTestnet();

async function callContractFunction() {
    const senderKey = 'your private key';
    const txOptions = {
        contractAdress: 'your contract address',
        contractName: 'your contract name',
        functionName: 'function name',
        functionArgs: [uintCV(42)],
        senderKey: senderKey,
        network: network,
    };
}

try {
    const transaction = await makeContractCall(txOptions);
    const response = await broadcastTransaction(transaction, network);
    console.log('Transaction ID:', response.txid);
} catch (error) {
    console.error('Error calling contract:', error)
}
// const condition01 = Pc.principal()
callContractFunction();