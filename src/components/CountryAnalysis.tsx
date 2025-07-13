import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CountryStats } from '../utils/dataProcessing';
import { Globe } from 'lucide-react';

interface CountryAnalysisProps {
  data: CountryStats[];
}

export const CountryAnalysis: React.FC<CountryAnalysisProps> = ({ data }) => {
  const top10Countries = data.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Globe className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Geographic Content Distribution</h2>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top 10 Countries by Content Production</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={top10Countries} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="country" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [value, 'Content Count']}
              labelFormatter={(label) => `Country: ${label}`}
            />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {top10Countries.slice(0, 5).map((country, index) => (
          <div key={country.country} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-indigo-600">#{index + 1}</span>
              <span className="text-sm font-medium text-indigo-800">
                {country.percentage.toFixed(1)}%
              </span>
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-1">{country.country}</h4>
            <p className="text-xl font-bold text-gray-900">{country.count}</p>
            <p className="text-xs text-gray-600">content pieces</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Geographic Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-800">Market Dominance</h4>
            <p className="text-gray-600">
              The top 3 countries ({top10Countries.slice(0, 3).map(c => c.country).join(', ')}) 
              account for {(top10Countries.slice(0, 3).reduce((sum, c) => sum + c.percentage, 0)).toFixed(1)}% 
              of all content.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Global Reach</h4>
            <p className="text-gray-600">
              Content spans {data.length} different countries, showing Netflix's 
              commitment to international programming and diverse storytelling.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-800">Regional Balance</h4>
            <p className="text-gray-600">
              Beyond the top producers, there's significant content from 
              emerging markets, indicating strategic investment in local content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};