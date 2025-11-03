

import { fetchTransactions } from '../lib/fetchTransactions.js';

export async function processTransactions() {
    const transactions = await fetchTransactions();

    if (!transactions) {
        console.log("Error getting transactions");
        return;
    }

    console.log("transactions:", transactions);
   
}


function processDrops() {

}

function processAdds() {

}

function processTrades() {
    
}