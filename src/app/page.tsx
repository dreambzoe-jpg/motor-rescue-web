import Map from "../components/Map";
import GarageCard from "../components/GarageCard";
import supabase from "../services/supabase";

async function getGarages() {
  const { data, error } = await supabase.from('garages').select('*')
  if (error) {
    console.error('Error fetching garages:', error)
    return []
  }
  return data || []
}

export default async function Home() {
  const garages = await getGarages()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Find Motor Rescue Services</h1>
      
      <div className="mb-8">
        <Map center={{ lat: -3.745, lng: -38.523 }} markers={garages.map(g => ({
          id: g.id,
          lat: g.latitude,
          lng: g.longitude,
          title: g.name
        }))} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {garages.map(garage => (
          <GarageCard key={garage.id} garage={garage} />
        ))}
      </div>
    </div>
  );
}
