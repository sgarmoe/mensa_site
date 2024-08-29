/*Page to import and display all rosters in MENSA*/


const league_id = 1045634813593706496; 
const url = `https://api.sleeper.app/v1/league/1045634813593706496/rosters`
console.log(url);

const rosterRes = fetch(`https://api.sleeper.app/v1/league/1045634813593706496/rosters`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.length > 0 ) {
            console.log(data[0]);
        } else {
            console.log("No data found");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });





const url1 = 'http://worldtimeapi.org/api/timezone/America/New_York'

async function getData() {
    const response = await fetch(url1)
    console.log(response)
}
getData()
        



    
    

