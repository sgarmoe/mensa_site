import { processTransactions } from '../helpers/processTransactions.js';

export async function processTransactionsController() {
    const processedTransactions = await processTransactions(2025);

    if (!processedTransactions) {
        console.log("Error processing transactions in Controller", error);
        return;
    }
    console.log("Processed Transactions: ", processedTransactions);
    return processedTransactions;
}

//processTransactionsController();