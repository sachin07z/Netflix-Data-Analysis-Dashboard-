import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { RatingDistribution } from '../utils/dataProcessing';
import { Star } from 'lucide-react';

interface RatingAnalysisProps {
  data: RatingDistribution[];
}

const RATING_COLORS = {
  'G': '#22c55e',
  'PG': '#84cc16',
  'PG-13': '#eab308',
  'R': '#f97316',
  'NC-17': '#ef4444',
  'TV-Y': '#10b981',
  'TV-Y7': '#059669',
  'TV-G': '#34d399',
  'TV-PG': '#fbbf24',
  'TV-14': '#f59e0b',
  'TV-MA': '#dc2626',
  'NR': '#6b7280',
  'UR': '#9ca3af'
};

export const RatingAnalysis: React.FC<RatingAnalysisProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    fill: RATING_COLORS[item.rating as keyof typeof RATING_COLORS] || '#6b7280'
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Star className="h-6 w-6 text-yellow-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Content Rating Distribution</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Rating Distribution by Content Type</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  value,
                  name === 'movies' ? 'Movies' : name === 'tvShows' ? 'TV Shows' : 'Total'
                ]}
              />
              <Bar dataKey="movies" fill="#8884d8" name="movies" />
              <Bar dataKey="tvShows" fill="#82ca9d" name="tvShows" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Overall Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="total"
                label={({ rating, total }) => `${rating}: ${total}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.slice(0, 4).map((rating, index) => (
          <div key={rating.rating} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span 
                className="px-2 py-1 rounded text-white text-xs font-bold"
                style={{ backgroundColor: RATING_COLORS[rating.rating as keyof typeof RATING_COLORS] || '#6b7280' }}
              >
                {rating.rating}
              </span>
              <span className="text-sm font-medium text-gray-600">
                #{index + 1}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">{rating.total}</p>
            <div className="text-xs text-gray-600 mt-1">
              <div>{rating.movies} movies</div>
              <div>{rating.tvShows} TV shows</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Rating Analysis Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-800">Family-Friendly Content</h4>
            <p className="text-gray-600">
              {((data.filter(r => ['G', 'PG', 'TV-G', 'TV-Y', 'TV-Y7'].includes(r.rating)).reduce((sum, r) => sum + r.total, 0) / data.reduce((sum, r) => sum + r.total, 0)) * 100).toFixed(1)}% 
              of content is suitable for general audiences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-orange-800">Mature Content</h4>
            <p className="text-gray-600">
              {((data.filter(r => ['R', 'NC-17', 'TV-MA'].includes(r.rating)).reduce((sum, r) => sum + r.total, 0) / data.reduce((sum, r) => sum + r.total, 0)) * 100).toFixed(1)}% 
              of content is rated for mature audiences only.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Teen Content</h4>
            <p className="text-gray-600">
              {((data.filter(r => ['PG-13', 'TV-14'].includes(r.rating)).reduce((sum, r) => sum + r.total, 0) / data.reduce((sum, r) => sum + r.total, 0)) * 100).toFixed(1)}% 
              of content targets teenage demographics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};