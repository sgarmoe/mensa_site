/* import LikeButton from '.like-button';*/
import "./globals.css";

 
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}
 
export default function HomePage() {
  const names = ['Insert Team names here'];
 
  return (
    <div>
      <Header title="Rosters for the Minimally Entertaining Nonchildbearing Sport Advocates (MENSA) Dynasty Football League!" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
     
    </div>
  );
}