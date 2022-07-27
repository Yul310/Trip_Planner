import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({setUser}) {


  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }


  return (
    <nav>
      <Link to="/trips">My Trips</Link>
      &nbsp; | &nbsp;
      <Link to="/trips/new">New Trip</Link>
      &nbsp; | &nbsp;
      <Link to="/trips/places">Set Places</Link>
      <Link
                  to=""
                  onClick={handleLogOut}
                  className="pl-3 text-white flex justify-start order-last p-2 border-[#1f1f1f] focus:text-black focus:bg-[#f7f7f2] border-r-8 hover:border-r-8 hover:border-[#C8B497] active: transition-colors duration-300 text-lg font-extralight"
                  aria-selected="false"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mt-1.5 text-orange-400"></i>
                  &nbsp;&nbsp;&nbsp;Log Out
                </Link>
    </nav>
  );
}