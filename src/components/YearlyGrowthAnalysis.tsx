import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { YearlyGrowth } from '../utils/dataProcessing';
import { TrendingUp } from 'lucide-react';

interface YearlyGrowthAnalysisProps {
  data: YearlyGrowth[];
}

export const YearlyGrowthAnalysis: React.FC<YearlyGrowthAnalysisProps> = ({ data }) => {
  const totalGrowth = data.length > 0 ? ((data[data.length - 1]?.total || 0) - (data[0]?.total || 0)) : 0;
  const avgYearlyGrowth = data.length > 1 ? totalGrowth / (data.length - 1) : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Content Growth Over Time</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Annual Content Additions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  value,
                  name === 'moviesAdded' ? 'Movies' : name === 'tvShowsAdded' ? 'TV Shows' : 'Total'
                ]}
              />
              <Area
                type="monotone"
                dataKey="moviesAdded"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="tvShowsAdded"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Cumulative Content Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Total Content']} />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#ff7300"
                strokeWidth={3}
                dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800">Peak Addition Year</h4>
          <p className="text-2xl font-bold text-blue-600">
            {data.reduce((max, curr) => curr.total > max.total ? curr : max, data[0])?.year || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            {data.reduce((max, curr) => curr.total > max.total ? curr : max, data[0])?.total || 0} titles added
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800">Total Growth</h4>
          <p className="text-2xl font-bold text-green-600">{totalGrowth}</p>
          <p className="text-sm text-gray-600">titles since {data[0]?.year || 'start'}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800">Avg. Yearly Growth</h4>
          <p className="text-2xl font-bold text-purple-600">{Math.round(avgYearlyGrowth)}</p>
          <p className="text-sm text-gray-600">titles per year</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800">Current Library</h4>
          <p className="text-2xl font-bold text-orange-600">
            {data[data.length - 1]?.cumulative || 0}
          </p>
          <p className="text-sm text-gray-600">total titles</p>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Growth Pattern Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-indigo-800">Investment Strategy</h4>
            <p className="text-gray-600">
              Netflix's content acquisition has shown {avgYearlyGrowth > 0 ? 'consistent' : 'variable'} growth, 
              with significant investment in both original and licensed content to maintain competitive advantage.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-red-800">Content Mix Evolution</h4>
            <p className="text-gray-600">
              The ratio between movies and TV shows reflects changing viewer preferences and Netflix's 
              strategic pivot toward binge-watchable series content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};