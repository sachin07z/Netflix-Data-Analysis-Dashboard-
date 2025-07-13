import React from 'react';
import { CleaningReport } from '../utils/dataProcessing';
import { CheckCircle, AlertTriangle, Database } from 'lucide-react';

interface DataCleaningReportProps {
  report: CleaningReport;
}

export const DataCleaningReport: React.FC<DataCleaningReportProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Database className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Data Cleaning Report</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">Dataset Overview</h3>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Original Records:</span>
              <span className="font-semibold">{report.originalCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Final Records:</span>
              <span className="font-semibold text-green-600">{report.finalCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duplicates Removed:</span>
              <span className="font-semibold text-red-600">{report.duplicatesRemoved}</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="font-semibold text-amber-800">Missing Values Handled</h3>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Director:</span>
              <span className="font-semibold">{report.missingValues.director}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cast:</span>
              <span className="font-semibold">{report.missingValues.cast}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Country:</span>
              <span className="font-semibold">{report.missingValues.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating:</span>
              <span className="font-semibold">{report.missingValues.rating}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date Added:</span>
              <span className="font-semibold">{report.missingValues.dateAdded}</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-800">Cleaning Methodology</h3>
          </div>
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <p>• Duplicate removal based on title + release year</p>
            <p>• Missing directors set to "Unknown Director"</p>
            <p>• Missing cast set to "Unknown Cast"</p>
            <p>• Missing countries set to "Unknown Country"</p>
            <p>• Missing ratings set to "Not Rated"</p>
            <p>• Date format standardization applied</p>
          </div>
        </div>
      </div>
    </div>
  );
};