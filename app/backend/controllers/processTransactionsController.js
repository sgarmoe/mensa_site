import { processTransactions } from '../helpers/processTransactions.js';

export async function processTransactionsController(year, week, limit) {
    if (!year) {
        throw new Error("Year is required param");
    }

    const processedTransactions = await processTransactions(year, week, limit);
    return processedTransactions;
}
