/*Page to import and display all rosters in MENSA*/


const league_id = 1045634813593706496; 
const url = 'https://api.sleeper.app/v1/league/1045634813593706496'


async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    process.exit(1);
  }

}
getData()

