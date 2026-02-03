import { processTransactions } from '../helpers/processTransactions.js';

export async function processTransactionsController(year, week) {
    if (!year) {
        throw new Error("Year is required param");
    }


    console.log("Year for TX fetch: ", year);
    console.log("Week for TX fetch: ", week);
    const processedTransactions = await processTransactions(year, week);
    console.log("Processed Transactions: ", processedTransactions);
    return processedTransactions;
}
