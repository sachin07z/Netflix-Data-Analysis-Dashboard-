import { NetflixContent } from '../data/sampleData';

export interface CleaningReport {
  originalCount: number;
  duplicatesRemoved: number;
  missingValues: {
    director: number;
    cast: number;
    country: number;
    rating: number;
    dateAdded: number;
  };
  finalCount: number;
}

export interface GenreStats {
  genre: string;
  count: number;
  percentage: number;
}

export interface CountryStats {
  country: string;
  count: number;
  percentage: number;
}

export interface YearlyGrowth {
  year: number;
  moviesAdded: number;
  tvShowsAdded: number;
  total: number;
  cumulative: number;
}

export interface RatingDistribution {
  rating: string;
  movies: number;
  tvShows: number;
  total: number;
}

export class NetflixDataProcessor {
  private data: NetflixContent[];
  private cleanedData: NetflixContent[];
  private cleaningReport: CleaningReport;

  constructor(rawData: NetflixContent[]) {
    this.data = rawData;
    this.cleanedData = [];
    this.cleaningReport = this.initializeCleaningReport();
    this.processData();
  }

  private initializeCleaningReport(): CleaningReport {
    return {
      originalCount: this.data.length,
      duplicatesRemoved: 0,
      missingValues: {
        director: this.data.filter(item => !item.director).length,
        cast: this.data.filter(item => !item.cast).length,
        country: this.data.filter(item => !item.country).length,
        rating: this.data.filter(item => !item.rating).length,
        dateAdded: this.data.filter(item => !item.date_added).length,
      },
      finalCount: 0
    };
  }

  private processData(): void {
    // Step 1: Remove duplicates based on title and release year
    const uniqueItems = new Map<string, NetflixContent>();
    
    this.data.forEach(item => {
      const key = `${item.title}-${item.release_year}`;
      if (!uniqueItems.has(key)) {
        uniqueItems.set(key, { ...item });
      }
    });

    this.cleaningReport.duplicatesRemoved = this.data.length - uniqueItems.size;

    // Step 2: Handle missing values
    this.cleanedData = Array.from(uniqueItems.values()).map(item => ({
      ...item,
      director: item.director || 'Unknown Director',
      cast: item.cast || 'Unknown Cast',
      country: item.country || 'Unknown Country',
      rating: item.rating || 'Not Rated',
      date_added: item.date_added || 'Unknown Date'
    }));

    this.cleaningReport.finalCount = this.cleanedData.length;
  }

  getCleaningReport(): CleaningReport {
    return this.cleaningReport;
  }

  getCleanedData(): NetflixContent[] {
    return this.cleanedData;
  }

  getGenreDistribution(): GenreStats[] {
    const genreCount = new Map<string, number>();
    
    this.cleanedData.forEach(item => {
      const genres = item.listed_in.split(', ').map(g => g.trim());
      genres.forEach(genre => {
        genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
      });
    });

    const total = this.cleanedData.length;
    return Array.from(genreCount.entries())
      .map(([genre, count]) => ({
        genre,
        count,
        percentage: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count);
  }

  getCountryDistribution(): CountryStats[] {
    const countryCount = new Map<string, number>();
    
    this.cleanedData.forEach(item => {
      if (item.country && item.country !== 'Unknown Country') {
        const countries = item.country.split(', ').map(c => c.trim());
        countries.forEach(country => {
          countryCount.set(country, (countryCount.get(country) || 0) + 1);
        });
      }
    });

    const total = Array.from(countryCount.values()).reduce((sum, count) => sum + count, 0);
    return Array.from(countryCount.entries())
      .map(([country, count]) => ({
        country,
        count,
        percentage: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15); // Top 15 countries
  }

  getYearlyGrowth(): YearlyGrowth[] {
    const yearlyData = new Map<number, { movies: number; tvShows: number }>();
    
    this.cleanedData.forEach(item => {
      if (item.date_added && item.date_added !== 'Unknown Date') {
        const year = new Date(item.date_added).getFullYear();
        if (!isNaN(year) && year >= 2008) {
          const current = yearlyData.get(year) || { movies: 0, tvShows: 0 };
          if (item.type === 'Movie') {
            current.movies++;
          } else {
            current.tvShows++;
          }
          yearlyData.set(year, current);
        }
      }
    });

    let cumulative = 0;
    return Array.from(yearlyData.entries())
      .map(([year, data]) => {
        const total = data.movies + data.tvShows;
        cumulative += total;
        return {
          year,
          moviesAdded: data.movies,
          tvShowsAdded: data.tvShows,
          total,
          cumulative
        };
      })
      .sort((a, b) => a.year - b.year);
  }

  getRatingDistribution(): RatingDistribution[] {
    const ratingCount = new Map<string, { movies: number; tvShows: number }>();
    
    this.cleanedData.forEach(item => {
      if (item.rating && item.rating !== 'Not Rated') {
        const current = ratingCount.get(item.rating) || { movies: 0, tvShows: 0 };
        if (item.type === 'Movie') {
          current.movies++;
        } else {
          current.tvShows++;
        }
        ratingCount.set(item.rating, current);
      }
    });

    return Array.from(ratingCount.entries())
      .map(([rating, data]) => ({
        rating,
        movies: data.movies,
        tvShows: data.tvShows,
        total: data.movies + data.tvShows
      }))
      .sort((a, b) => b.total - a.total);
  }

  getContentAgeAnalysis(): { decade: string; count: number; avgAge: number }[] {
    const currentYear = new Date().getFullYear();
    const decadeData = new Map<string, { count: number; totalAge: number }>();
    
    this.cleanedData.forEach(item => {
      const decade = `${Math.floor(item.release_year / 10) * 10}s`;
      const age = currentYear - item.release_year;
      
      const current = decadeData.get(decade) || { count: 0, totalAge: 0 };
      current.count++;
      current.totalAge += age;
      decadeData.set(decade, current);
    });

    return Array.from(decadeData.entries())
      .map(([decade, data]) => ({
        decade,
        count: data.count,
        avgAge: Math.round(data.totalAge / data.count)
      }))
      .sort((a, b) => a.decade.localeCompare(b.decade));
  }

  getGenreEvolution(): { year: number; [genre: string]: number }[] {
    const topGenres = this.getGenreDistribution().slice(0, 8).map(g => g.genre);
    const yearGenreData = new Map<number, Map<string, number>>();
    
    this.cleanedData.forEach(item => {
      if (item.date_added && item.date_added !== 'Unknown Date') {
        const year = new Date(item.date_added).getFullYear();
        if (!isNaN(year) && year >= 2015) {
          const genres = item.listed_in.split(', ').map(g => g.trim());
          
          if (!yearGenreData.has(year)) {
            yearGenreData.set(year, new Map());
          }
          
          const yearData = yearGenreData.get(year)!;
          genres.forEach(genre => {
            if (topGenres.includes(genre)) {
              yearData.set(genre, (yearData.get(genre) || 0) + 1);
            }
          });
        }
      }
    });

    return Array.from(yearGenreData.entries())
      .map(([year, genreMap]) => {
        const result: { year: number; [genre: string]: number } = { year };
        topGenres.forEach(genre => {
          result[genre] = genreMap.get(genre) || 0;
        });
        return result;
      })
      .sort((a, b) => a.year - b.year);
  }
}