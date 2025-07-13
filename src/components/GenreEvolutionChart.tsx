import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock } from 'lucide-react';

interface GenreEvolutionData {
  year: number;
  [genre: string]: number;
}

interface GenreEvolutionChartProps {
  data: GenreEvolutionData[];
}

const GENRE_COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1',
  '#d084d0', '#ffb347', '#87ceeb', '#deb887', '#f0e68c'
];

export const GenreEvolutionChart: React.FC<GenreEvolutionChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Get all genres (excluding 'year')
  const genres = Object.keys(data[0]).filter(key => key !== 'year');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Genre Popularity Evolution</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">
          Track how different genres have gained or lost popularity over time on Netflix's platform.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Legend />
          {genres.map((genre, index) => (
            <Line
              key={genre}
              type="monotone"
              dataKey={genre}
              stroke={GENRE_COLORS[index % GENRE_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Genre Trend Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-purple-800">Emerging Trends</h4>
            <p className="text-gray-600">
              Certain genres show significant growth patterns, indicating shifting viewer preferences 
              and Netflix's strategic content investments in trending categories.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-800">Seasonal Patterns</h4>
            <p className="text-gray-600">
              Genre popularity often correlates with cultural moments, seasonal viewing habits, 
              and global events that influence content consumption patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};