import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GenreStats } from '../utils/dataProcessing';

interface GenreDistributionChartProps {
  data: GenreStats[];
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1',
  '#d084d0', '#ffb347', '#87ceeb', '#deb887', '#f0e68c'
];

export const GenreDistributionChart: React.FC<GenreDistributionChartProps> = ({ data }) => {
  const topGenres = data.slice(0, 10);
  const pieData = data.slice(0, 8);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Genre Distribution Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 10 Genres by Content Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topGenres} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="genre" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Content Count']} />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Genre Distribution (Top 8)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ genre, percentage }) => `${genre}: ${percentage.toFixed(1)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800">Most Popular Genre</h4>
            <p className="text-2xl font-bold text-blue-600">{topGenres[0]?.genre}</p>
            <p className="text-sm text-gray-600">{topGenres[0]?.count} titles ({topGenres[0]?.percentage.toFixed(1)}%)</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800">Total Genres</h4>
            <p className="text-2xl font-bold text-green-600">{data.length}</p>
            <p className="text-sm text-gray-600">Unique genre categories</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800">Genre Diversity</h4>
            <p className="text-2xl font-bold text-purple-600">{(data.slice(0, 5).reduce((sum, g) => sum + g.percentage, 0)).toFixed(1)}%</p>
            <p className="text-sm text-gray-600">Top 5 genres coverage</p>
          </div>
        </div>
      </div>
    </div>
  );
};