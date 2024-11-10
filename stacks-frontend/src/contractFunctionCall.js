import { makeContractCall, broadcastTransaction, uintCV} from "@stacks/transactions";
import { StacksTestnet } from '@stacks/network'

const network = new StacksTestnet();
const senderKey = 'your private key';

async function callContractFunction() {

export async function issueKey((issue-key), [principal]) {
    const txOptions = {
        contractAddress: 'your contract address',
        contractName: 'KeyIssuance',
        functionName,
        functionArgs,
        senderKey,
        network,
    };

    const transaction = await makeContractCall(txOptions)
    return broadcastTransaction(transition, network);
}

