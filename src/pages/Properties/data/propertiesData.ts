
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parkingSpaces: number;
  imageUrl: string;
  featured?: boolean;
  newProperty?: boolean;
}

// Sample properties data
export const propertiesData: Property[] = [
  {
    id: '1',
    title: 'Apartamento Luxuoso com Vista',
    price: 1250000,
    location: 'Jardins, São Paulo',
    type: 'Apartamento',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parkingSpaces: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    newProperty: false
  },
  {
    id: '2',
    title: 'Casa Moderna em Condomínio',
    price: 2150000,
    location: 'Alphaville, São Paulo',
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    parkingSpaces: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    newProperty: true
  },
  {
    id: '3',
    title: 'Cobertura Duplex com Terraço',
    price: 3500000,
    location: 'Moema, São Paulo',
    type: 'Cobertura',
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    parkingSpaces: 2,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: true,
    newProperty: false
  },
  {
    id: '4',
    title: 'Studio Moderno bem Localizado',
    price: 650000,
    location: 'Vila Madalena, São Paulo',
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    featured: true,
    newProperty: true
  },
  {
    id: '5',
    title: 'Apartamento com Vista para o Parque',
    price: 980000,
    location: 'Pinheiros, São Paulo',
    type: 'Apartamento',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    newProperty: true
  },
  {
    id: '6',
    title: 'Casa de Campo com Piscina',
    price: 1750000,
    location: 'Ibiúna, São Paulo',
    type: 'Casa',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    parkingSpaces: 4,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    newProperty: false
  },
  {
    id: '7',
    title: 'Loft Industrial Reformado',
    price: 890000,
    location: 'Barra Funda, São Paulo',
    type: 'Loft',
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    parkingSpaces: 1,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    featured: false,
    newProperty: false
  },
  {
    id: '8',
    title: 'Apartamento Alto Padrão',
    price: 2850000,
    location: 'Itaim Bibi, São Paulo',
    type: 'Apartamento',
    bedrooms: 3,
    bathrooms: 4,
    area: 160,
    parkingSpaces: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    featured: false,
    newProperty: false
  }
];
