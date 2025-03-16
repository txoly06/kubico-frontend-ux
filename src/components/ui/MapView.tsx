
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, XCircle } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
}

interface MapViewProps {
  properties: Property[];
  onPropertySelect: (propertyId: string) => void;
  onClose: () => void;
}

const MapView: React.FC<MapViewProps> = ({ properties, onPropertySelect, onClose }) => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real implementation, we would use a library like Google Maps, Mapbox, or Leaflet
    console.log('Map initialized with properties:', properties);
    setMapInitialized(true);
  }, [properties]);

  // Demo coordinates (for display purposes only)
  const demoCoordinates = [
    { lat: -23.5505, lng: -46.6333 }, // São Paulo
    { lat: -23.5475, lng: -46.6361 },
    { lat: -23.5545, lng: -46.6310 },
    { lat: -23.5425, lng: -46.6380 },
    { lat: -23.5580, lng: -46.6320 },
    { lat: -23.5520, lng: -46.6370 },
    { lat: -23.5490, lng: -46.6290 },
    { lat: -23.5570, lng: -46.6400 }
  ];

  // Assign demo coordinates to properties
  const propertiesWithCoordinates = properties.map((property, index) => ({
    ...property,
    latitude: demoCoordinates[index % demoCoordinates.length].lat,
    longitude: demoCoordinates[index % demoCoordinates.length].lng
  }));

  const handlePropertyClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    onPropertySelect(propertyId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="relative w-full max-w-5xl h-[80vh] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-white/80 hover:bg-white">
            <XCircle className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
        
        <div className="h-full relative">
          {/* Map placeholder - would be replaced with actual map component */}
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            {!mapInitialized ? (
              <div className="text-gray-500">Carregando mapa...</div>
            ) : (
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center relative">
                {/* Property markers */}
                {propertiesWithCoordinates.map((property) => (
                  <div 
                    key={property.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-full transition-all duration-300 ${
                      selectedProperty === property.id ? 'scale-125 z-20' : 'z-10'
                    }`}
                    style={{ 
                      left: `${((property.longitude! + 46.64) * 5000) % 100}%`, 
                      top: `${((property.latitude! + 23.56) * 5000) % 100}%` 
                    }}
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full ${
                        selectedProperty === property.id 
                          ? 'bg-kubico-blue text-white' 
                          : 'bg-white text-kubico-blue'
                      }`}>
                        <MapPin className="h-6 w-6" />
                      </div>
                      
                      {selectedProperty === property.id && (
                        <div className="mt-2 bg-white rounded-lg shadow-lg p-3 w-48 animate-fade-in">
                          <div className="w-full h-24 overflow-hidden rounded-md mb-2">
                            <img 
                              src={property.imageUrl} 
                              alt={property.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="font-medium text-sm truncate">{property.title}</h4>
                          <p className="text-kubico-blue font-semibold text-sm">
                            {property.price.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 0,
                            })}
                          </p>
                          <p className="text-gray-500 text-xs truncate">{property.location}</p>
                          <Button 
                            size="sm" 
                            className="w-full mt-2 bg-kubico-blue hover:bg-kubico-blue/90 text-xs"
                            onClick={() => onPropertySelect(property.id)}
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapView;
