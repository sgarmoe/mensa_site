import { processTransactions } from '../helpers/processTransactions.js';

export async function processTransactionsController(year, week) {
    if (!year) {
        throw new Error("Year is required param");
    }

    const processedTransactions = await processTransactions(year, week);
    //console.log("Processed Transactions: ", processedTransactions);
    return processedTransactions;
}
