export interface Turf {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  pricePerSlot: number;
  maxPlayers: number;
  description: string;
  image: string;
}

export interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked';
}

export interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  city: string;
  date: string;
  slotTime: string;
  price: number;
  status: 'booked' | 'cancelled';
  bookedAt: string;
}

export interface User {
  fullName: string;
  email: string;
  mobile: string;
}

export const CITIES = [
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Coimbatore',
  'Madurai',
  'Puducherry',
] as const;

export type City = typeof CITIES[number];

export const SLOT_TIMINGS: { startTime: string; endTime: string }[] = [
  { startTime: '12:00 AM', endTime: '2:00 AM' },
  { startTime: '2:00 AM', endTime: '4:00 AM' },
  { startTime: '4:00 AM', endTime: '6:00 AM' },
  { startTime: '6:00 AM', endTime: '8:00 AM' },
  { startTime: '8:00 AM', endTime: '10:00 AM' },
  { startTime: '10:00 AM', endTime: '12:00 PM' },
  { startTime: '12:00 PM', endTime: '2:00 PM' },
  { startTime: '2:00 PM', endTime: '4:00 PM' },
  { startTime: '4:00 PM', endTime: '6:00 PM' },
  { startTime: '6:00 PM', endTime: '8:00 PM' },
  { startTime: '8:00 PM', endTime: '10:00 PM' },
  { startTime: '10:00 PM', endTime: '12:00 AM' },
];

export const TURFS: Turf[] = [
  // Chennai
  {
    id: 'turf-1',
    name: 'Green Arena Sports Hub',
    city: 'Chennai',
    area: 'Adyar',
    address: '123, Gandhi Nagar, Adyar, Chennai - 600020',
    pricePerSlot: 1500,
    maxPlayers: 14,
    description: 'Premium 7-a-side football turf with FIFA-approved artificial grass. Features floodlights, changing rooms, and refreshment zone.',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
  },
  {
    id: 'turf-2',
    name: 'Kickstart Turf Arena',
    city: 'Chennai',
    area: 'Velachery',
    address: '45, Main Road, Velachery, Chennai - 600042',
    pricePerSlot: 1200,
    maxPlayers: 10,
    description: 'Modern 5-a-side turf with high-quality synthetic grass. Perfect for quick matches and corporate events.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
  },
  {
    id: 'turf-3',
    name: 'Goal Zone Chennai',
    city: 'Chennai',
    area: 'T Nagar',
    address: '78, Pondy Bazaar, T Nagar, Chennai - 600017',
    pricePerSlot: 1800,
    maxPlayers: 14,
    description: 'State-of-the-art facility with professional-grade turf. Includes spectator seating and live score display.',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
  },
  // Bengaluru
  {
    id: 'turf-4',
    name: 'Bangalore Sports Complex',
    city: 'Bengaluru',
    area: 'Koramangala',
    address: '234, 5th Block, Koramangala, Bengaluru - 560095',
    pricePerSlot: 2000,
    maxPlayers: 14,
    description: 'Premium sports facility with international-standard artificial turf. Features night lighting and player amenities.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
  },
  {
    id: 'turf-5',
    name: 'PlayField HSR',
    city: 'Bengaluru',
    area: 'HSR Layout',
    address: '67, Sector 2, HSR Layout, Bengaluru - 560102',
    pricePerSlot: 1600,
    maxPlayers: 10,
    description: 'Modern turf ground perfect for weekend matches. Well-maintained grass and excellent drainage system.',
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800',
  },
  // Hyderabad
  {
    id: 'turf-6',
    name: 'Hyderabad Turf Club',
    city: 'Hyderabad',
    area: 'Banjara Hills',
    address: '89, Road No. 12, Banjara Hills, Hyderabad - 500034',
    pricePerSlot: 1700,
    maxPlayers: 14,
    description: 'Elite sports facility with premium amenities. Features cafeteria, pro shop, and VIP viewing area.',
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800',
  },
  {
    id: 'turf-7',
    name: 'Goal Masters Arena',
    city: 'Hyderabad',
    area: 'Gachibowli',
    address: '156, IT Park Road, Gachibowli, Hyderabad - 500032',
    pricePerSlot: 1400,
    maxPlayers: 10,
    description: 'Tech park favorite with convenient location. Perfect for corporate team building and after-work games.',
    image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800',
  },
  // Coimbatore
  {
    id: 'turf-8',
    name: 'Kovai Sports Arena',
    city: 'Coimbatore',
    area: 'RS Puram',
    address: '34, Cross Cut Road, RS Puram, Coimbatore - 641002',
    pricePerSlot: 1100,
    maxPlayers: 14,
    description: 'Popular turf in the heart of Coimbatore. Excellent facilities with covered seating for spectators.',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
  },
  // Madurai
  {
    id: 'turf-9',
    name: 'Temple City Turf',
    city: 'Madurai',
    area: 'Anna Nagar',
    address: '56, Bypass Road, Anna Nagar, Madurai - 625020',
    pricePerSlot: 1000,
    maxPlayers: 10,
    description: 'Best turf facility in Madurai with quality playing surface. Family-friendly environment with parking.',
    image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800',
  },
  // Puducherry
  {
    id: 'turf-10',
    name: 'French Quarter Sports',
    city: 'Puducherry',
    area: 'White Town',
    address: '12, Beach Road, White Town, Puducherry - 605001',
    pricePerSlot: 1300,
    maxPlayers: 14,
    description: 'Scenic turf near the beach with beautiful surroundings. Unique colonial-era building as backdrop.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
  },
  {
    id: 'turf-11',
    name: 'Pondy Play Zone',
    city: 'Puducherry',
    area: 'Lawspet',
    address: '89, ECR Road, Lawspet, Puducherry - 605008',
    pricePerSlot: 900,
    maxPlayers: 10,
    description: 'Affordable and well-maintained turf. Popular among local teams and college students.',
    image: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=800',
  },
];

export const generateBookingId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TRF-${timestamp}-${random}`;
};
