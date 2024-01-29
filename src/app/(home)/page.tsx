import { TripSearch } from "./components/TripSearch";
import { QuickSearch } from "./components/QuickSearch";
import { RecommenderTrips } from "./components/RecommendedTrips";

export default function Home() {

  
  return (
    <main>
     <TripSearch/>
     <QuickSearch/>
     <RecommenderTrips/>
    </main>
  )
}
