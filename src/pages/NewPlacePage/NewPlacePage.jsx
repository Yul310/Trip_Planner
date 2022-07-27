import Maps from '../../components/Maps/Maps';
import PlaceCard from '../../components/PlaceCard/PlaceCard';

export default function NewDestinationPage({setUpdated, allTrips, allPlaces,setAllPlaces }) {

    return (

        <div>
       
        <Maps />
        <h3>New Places</h3>
        <PlaceCard allPlaces={allPlaces} setAllPlaces={setAllPlaces}/>
        </div>

        )
    }
    