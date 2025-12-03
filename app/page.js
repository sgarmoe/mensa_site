import { MongoClient, ServerApiVersion } from 'mongodb';
import "./globals.css";
import "./layout.js"
import Link from 'next/link';
import "./rosters/page.js";

// const leagueID = '1045634813593706496' //sleeper league ID
// const uri = process.env.MONGODB_URI;

// function Header({ title }) {
//   return( 
//     <h1 style={{ textAlign: 'center'}}>
//     {title ? title : 'Default title'}
//     </h1>
//     );
// }

export default function HomePage() {
  return (
    <div>
      <h1>Home Page for MENSA FFL</h1>
      {/* <Link href="/rosters"> Rosters
      </Link> */}

      <Link href="/rosters">Rosters Page 
      </Link>
      
      <p1>Recent Transactions</p1>
      <p1></p1>
    </div>
  );
}
