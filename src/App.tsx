import React, { useMemo } from 'react';
import { BarChart3, Database, Globe, TrendingUp, Star, Clock, Target } from 'lucide-react';
import { sampleNetflixData } from './data/sampleData';
import { NetflixDataProcessor } from './utils/dataProcessing';
import { DataCleaningReport } from './components/DataCleaningReport';
import { GenreDistributionChart } from './components/GenreDistributionChart';
import { CountryAnalysis } from './components/CountryAnalysis';
import { YearlyGrowthAnalysis } from './components/YearlyGrowthAnalysis';
import { RatingAnalysis } from './components/RatingAnalysis';
import { GenreEvolutionChart } from './components/GenreEvolutionChart';
import { StrategicInsights } from './components/StrategicInsights';

function App() {
  const analysisData = useMemo(() => {
    const processor = new NetflixDataProcessor(sampleNetflixData);
    return {
      cleaningReport: processor.getCleaningReport(),
      cleanedData: processor.getCleanedData(),
      genreDistribution: processor.getGenreDistribution(),
      countryDistribution: processor.getCountryDistribution(),
      yearlyGrowth: processor.getYearlyGrowth(),
      ratingDistribution: processor.getRatingDistribution(),
      contentAgeAnalysis: processor.getContentAgeAnalysis(),
      genreEvolution: processor.getGenreEvolution()
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="h-12 w-12 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold">Netflix Content Analysis</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Comprehensive analysis of Netflix's content portfolio revealing key trends, 
              patterns, and strategic insights for streaming media dominance
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                <span>{analysisData.cleanedData.length.toLocaleString()} Content Items</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <span>{analysisData.countryDistribution.length} Countries</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                <span>{analysisData.genreDistribution.length} Genres</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Database, label: 'Data Cleaning', id: 'cleaning' },
              { icon: BarChart3, label: 'Genre Analysis', id: 'genres' },
              { icon: Globe, label: 'Geographic Distribution', id: 'geography' },
              { icon: TrendingUp, label: 'Growth Trends', id: 'growth' },
              { icon: Star, label: 'Rating Analysis', id: 'ratings' },
              { icon: Clock, label: 'Genre Evolution', id: 'evolution' },
              { icon: Target, label: 'Strategic Insights', id: 'insights' }
            ].map(({ icon: Icon, label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-700 hover:text-red-600"
              >
                <Icon className="h-4 w-4 mr-2" />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Analysis Sections */}
        <div className="space-y-8">
          <section id="cleaning">
            <DataCleaningReport report={analysisData.cleaningReport} />
          </section>

          <section id="genres">
            <GenreDistributionChart data={analysisData.genreDistribution} />
          </section>

          <section id="geography">
            <CountryAnalysis data={analysisData.countryDistribution} />
          </section>

          <section id="growth">
            <YearlyGrowthAnalysis data={analysisData.yearlyGrowth} />
          </section>

          <section id="ratings">
            <RatingAnalysis data={analysisData.ratingDistribution} />
          </section>

          <section id="evolution">
            <GenreEvolutionChart data={analysisData.genreEvolution} />
          </section>

          <section id="insights">
            <StrategicInsights 
              genreData={analysisData.genreDistribution}
              countryData={analysisData.countryDistribution}
            />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Analysis Complete</h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              This comprehensive analysis provides actionable insights for content strategy, 
              market expansion, and audience development. The data reveals Netflix's strategic 
              positioning in the global streaming market with opportunities for continued growth.
            </p>
            <div className="flex justify-center items-center text-sm text-gray-500">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span>Powered by advanced data analytics and visualization</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;