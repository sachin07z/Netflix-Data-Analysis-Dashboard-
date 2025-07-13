import { shuffle } from 'lodash';

export interface NetflixContent {
  show_id: string;
  type: 'Movie' | 'TV Show';
  title: string;
  director: string | null;
  cast: string | null;
  country: string | null;
  date_added: string | null;
  release_year: number;
  rating: string | null;
  duration: string;
  listed_in: string;
  description: string;
}

// Sample data generation to simulate real Netflix dataset
const countries = [
  'United States', 'India', 'United Kingdom', 'Canada', 'South Korea',
  'Japan', 'Spain', 'France', 'Germany', 'Australia', 'Mexico', 'Brazil',
  'Italy', 'Netherlands', 'Turkey', 'Argentina', 'Thailand', 'Nigeria',
  'Egypt', 'South Africa', 'Philippines', 'Indonesia', 'Taiwan', 'Hong Kong'
];

const genres = [
  'Dramas', 'Comedies', 'Action & Adventure', 'Thrillers', 'Horror Movies',
  'Documentaries', 'Romantic Movies', 'Sci-Fi & Fantasy', 'Crime TV Shows',
  'Reality TV', 'Kids & Family Movies', 'International Movies', 'Stand-Up Comedy',
  'Music & Musicals', 'Anime Features', 'LGBTQ Movies', 'Independent Movies',
  'Classic Movies', 'Sports Movies', 'Faith & Spirituality'
];

const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA', 'NR', 'UR'];

const directors = [
  'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino', 'Steven Spielberg',
  'Denis Villeneuve', 'Jordan Peele', 'Greta Gerwig', 'Bong Joon-ho',
  'Rian Johnson', 'Chloe Zhao', 'Ryan Coogler', 'Taika Waititi',
  'Ari Aster', 'Robert Eggers', 'Lulu Wang', 'Barry Jenkins'
];

const actors = [
  'Leonardo DiCaprio', 'Meryl Streep', 'Denzel Washington', 'Scarlett Johansson',
  'Tom Hanks', 'Sandra Bullock', 'Robert Downey Jr.', 'Jennifer Lawrence',
  'Brad Pitt', 'Angelina Jolie', 'Will Smith', 'Emma Stone',
  'Ryan Gosling', 'Natalie Portman', 'Christian Bale', 'Amy Adams'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().slice(0, 10); // Returns 'YYYY-MM-DD'
}

export function generateSampleData(count: number = 1000): NetflixContent[] {
  const data: NetflixContent[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.6 ? 'Movie' : 'TV Show';
    const releaseYear = 1990 + Math.floor(Math.random() * 35);
    const addedYear = Math.max(releaseYear + 1, 2008 + Math.floor(Math.random() * 17));
    
    // Simulate missing data patterns
    const hasDirector = Math.random() > 0.15; // 15% missing directors
    const hasCast = Math.random() > 0.08; // 8% missing cast
    const hasCountry = Math.random() > 0.12; // 12% missing country
    const hasRating = Math.random() > 0.10; // 10% missing ratings
    const hasDateAdded = Math.random() > 0.05; // 5% missing dates
    
    const item: NetflixContent = {
      show_id: `s${i + 1}`,
      type,
      title: `${type === 'Movie' ? 'Movie' : 'Series'} Title ${i + 1}`,
      director: hasDirector ? getRandomElement(directors) : null,
      cast: hasCast ? getRandomElements(actors, 2 + Math.floor(Math.random() * 4)).join(', ') : null,
      country: hasCountry ? getRandomElements(countries, 1 + Math.floor(Math.random() * 3)).join(', ') : null,
      date_added: hasDateAdded ? generateRandomDate(new Date(addedYear, 0, 1), new Date(2024, 11, 31)) : null,
      release_year: releaseYear,
      rating: hasRating ? getRandomElement(ratings) : null,
      duration: type === 'Movie' 
        ? `${80 + Math.floor(Math.random() * 100)} min`
        : `${1 + Math.floor(Math.random() * 8)} Season${Math.floor(Math.random() * 8) > 0 ? 's' : ''}`,
      listed_in: getRandomElements(genres, 1 + Math.floor(Math.random() * 3)).join(', '),
      description: `This is a sample description for ${type.toLowerCase()} content item ${i + 1}.`
    };
    
    data.push(item);
  }
  
  return data;
}

export const sampleNetflixData = generateSampleData(1200);