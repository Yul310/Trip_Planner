import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <Link to="/trips">My Trips</Link>
      &nbsp; | &nbsp;
      <Link to="/trips/new">New Trip</Link>
    </nav>
  );
}