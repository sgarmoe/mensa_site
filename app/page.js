import { MongoClient, ServerApiVersion } from 'mongodb';
import "./globals.css";
import "./layout.js"
import Link from 'next/link';
import "./rosters/page.js";
import "./backend/lib/fetchTransactions";

const leagueID = '1045634813593706496' //sleeper league ID
const uri = process.env.MONGODB_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


function Header({ title }) {
  return( 
    <h1 style={{ textAlign: 'center'}}>
    {title ? title : 'Default title'}
    </h1>
    );
}

export default function HomePage() {
  return (
    <div>
      <h1>Home Page for MENSA FFL</h1>
      {/* <Link href="/rosters"> Rosters
      </Link> */}

      <Link href="/newRosters">Updated Rosters
      </Link>
      
      <p1>Recent Transactions</p1>
      <p1></p1>
    </div>
  );
}
