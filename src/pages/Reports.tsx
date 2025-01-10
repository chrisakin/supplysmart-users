import { useEffect } from 'react';
import { FileBarChart, Download } from 'lucide-react';
import { useReportsStore } from '../store/reports';
import { useUserType } from '../hooks/useUserType';
import { usePagination } from '../hooks/usePagination';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Pagination } from '../components/ui/Pagination';
import { formatDate } from '../lib/utils';
import toast from 'react-hot-toast';

export default function Reports() {
  const userType = useUserType();
  const { reports, meta, loading, error, fetchReports, generateReport } = useReportsStore();
  const { page, setPage, getPaginationParams } = usePagination(10);

  useEffect(() => {
    const loadReports = async () => {
      try {
        await fetchReports(userType, getPaginationParams());
      } catch (err) {
        console.error('Failed to load reports:', err);
      }
    };
    loadReports();
  }, [userType, page, fetchReports]);

  const handleGenerateReport = async (type: string) => {
    try {
      await generateReport(userType, type);
      toast.success('Report generation started');
      // Refresh the reports list
      fetchReports(userType, getPaginationParams());
    } catch (error) {
      console.error('Failed to generate report:', error);
      toast.error('Failed to generate report');
    }
  };

  if (loading && !reports.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">View and download transaction reports</p>
        </div>
        <button
          onClick={() => handleGenerateReport('transactions')}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2"
        >
          <FileBarChart className="w-5 h-5" />
          Generate Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Report History</h2>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => fetchReports(userType, getPaginationParams())}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Retry
            </button>
          </div>
        ) : reports.length === 0 ? (
          <EmptyState
            title="No reports found"
            description="Generate a report to get started"
            actionLabel="Generate Report"
            onAction={() => handleGenerateReport('transactions')}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">{report.type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          report.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : report.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatDate(report.createdAt)}</td>
                      <td className="px-6 py-4">
                        {report.status === 'Completed' && report.downloadUrl && (
                          <a
                            href={report.downloadUrl}
                            download
                            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {meta && (
              <Pagination
                currentPage={meta.currentPage}
                totalPages={meta.lastPage}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}