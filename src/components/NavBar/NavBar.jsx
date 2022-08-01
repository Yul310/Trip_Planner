import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user,setUser }) {


  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }


  return (
    <nav>
      <div className="grid grid-cols-3 items-center">

      
          <Link
            to=""
            onClick={handleLogOut}
            className="flex flex-row ml-10 text-[#CFFCFF] font-bold"
            aria-selected="false"
          >
            <i className="fa-solid fa-arrow-right-from-bracket mt-1.5 text-[#AAEFDF]"></i>
            &nbsp;&nbsp;&nbsp;Log Out
          </Link>
        

<div>

<h1 className="text-[#CFFCFF] text-4xl font-bold" id="title">Trip Note</h1>

</div>




        <div className="flex flex-row-reverse mr-20">
          <Link to="/trips" className="text-[#CFFCFF] font-bold ">My Trips</Link>
          <div className="text-[#AAEFDF] font-bold ">&nbsp; | &nbsp;</div>
          <Link to="/trips/new" className="text-[#CFFCFF] font-bold ">New Trip</Link>
          <div className="text-[#AAEFDF] font-bold ">&nbsp; | &nbsp;</div>
          <Link to="/" className="text-[#CFFCFF] font-bold ">Home</Link>
        </div>




        
      </div>
    </nav>
  );
}