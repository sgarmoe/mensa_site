import { fetchUserTeamNames } from "../lib/fetchSleeperData.js";
import { SEASONS } from "../config/seasons.js";

//used to fetch user data from sleeper & structure for storage in neon

//will also need helper(?) file to prompt all Neon helper functions to 
//conduct the data processing for each season

//may want a quick test script to throw in a season while writing 
//for sake of checks on data correctness

const leagueId = SEASONS[year];

async function processUserDataForNeon() {

    const userData = await fetchUserTeamNames(year);
    console.log(userData);

    //loop to deconstruct json objects and assign to each user

}