import { processTransactions } from '../helpers/processTransactions.js';

export async function processTransactionsController() {
    const processedTransactions = await processTransactions();

    if (!processedTransactions) {
        console.log("Error processing transactions in Controller", error);
        return;
    }
    //console.log("Processed Transactions: ", processedTransactions);
    return processedTransactions;
}

//processTransactionsController();