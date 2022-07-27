import Maps from '../../components/Maps/Maps';

export default function NewDestinationPage({setUpdated, allTrips, allPlaces}) {

    return (

        <div>
       
        <Maps allPlaces={allPlaces}/>
        <h3>New Trip</h3>
      
        </div>

        )
    }
    