import { MongoClient, ServerApiVersion } from 'mongodb';
import "./globals.css";
import "./layout.js"
import Link from 'next/link';
import "./rosters/page.js";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page for MENSA FFL</h1>
    </div>
  );
}
