import React from 'react';
import { Target, TrendingUp, Globe, Users } from 'lucide-react';
import { GenreStats, CountryStats } from '../utils/dataProcessing';

interface StrategicInsightsProps {
  genreData: GenreStats[];
  countryData: CountryStats[];
}

export const StrategicInsights: React.FC<StrategicInsightsProps> = ({ genreData, countryData }) => {
  const topGenres = genreData.slice(0, 3);
  const topCountries = countryData.slice(0, 3);
  
  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg shadow-lg p-8 text-white">
      <div className="flex items-center mb-8">
        <Target className="h-8 w-8 text-yellow-400 mr-4" />
        <h2 className="text-3xl font-bold">Strategic Insights & Recommendations</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">Content Strategy Opportunities</h3>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>
                  <strong>{topGenres[0]?.genre}</strong> dominates with {topGenres[0]?.percentage.toFixed(1)}% 
                  - consider expanding sub-genres to avoid oversaturation
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                  Underrepresented genres present growth opportunities for niche audience capture
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>
                  Content diversity across {genreData.length} genres suggests healthy portfolio balance
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold">Global Expansion Insights</h3>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>
                  <strong>{topCountries[0]?.country}</strong> leads production with {(topCountries[0]?.percentage ?? 0).toFixed(1)}% 
                  market share - diversification opportunity exists
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                  {countryData.length} countries represented - strong international presence established
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>
                  Emerging markets show content growth potential for localized investment
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold">Audience Development</h3>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>
                  Focus on high-engagement genres while maintaining content variety for broader appeal
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span>
                  International content strategy can tap into diaspora audiences and cultural curiosity
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                <span>
                  Rating distribution suggests balanced family-friendly and mature content approach
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-orange-400 mr-3" />
              <h3 className="text-xl font-semibold">Key Performance Indicators</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{genreData.length}</div>
                <div className="text-sm text-gray-300">Active Genres</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{countryData.length}</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {topGenres.slice(0, 3).reduce((sum, g) => sum + g.percentage, 0).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-300">Top 3 Genres</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {topCountries.slice(0, 3).reduce((sum, c) => sum + c.percentage, 0).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-300">Top 3 Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Executive Summary</h3>
        <p className="text-gray-200 leading-relaxed">
          Netflix's content portfolio demonstrates strong diversity across genres and geographic regions. 
          The platform maintains a healthy balance between popular mainstream content and niche offerings, 
          with significant opportunities for strategic expansion in underrepresented markets and emerging 
          content categories. The data suggests a mature content strategy with room for calculated risks 
          in new genre experiments and international co-productions.
        </p>
      </div>
    </div>
  );
};