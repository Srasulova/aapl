'use client';

import { useEffect, useState } from 'react';

interface FinancialData {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

interface FilterState {
  startYear: string;
  endYear: string;
  minRevenue: string;
  maxRevenue: string;
  minNetIncome: string;
  maxNetIncome: string;
}

export default function Home() {
  const [data, setData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    startYear: '',
    endYear: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/financial-data', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json() as FinancialData[];
        const uniqueData = Array.from(
          new Map(jsonData.map((item: FinancialData) => [item.date, item])).values()
        );
        setData(uniqueData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const filteredData = data.filter(item => {
    const year = new Date(item.date).getFullYear();
    const matchesYear = (!filters.startYear || year >= parseInt(filters.startYear)) &&
      (!filters.endYear || year <= parseInt(filters.endYear));

    const matchesRevenue = (!filters.minRevenue || item.revenue >= parseInt(filters.minRevenue)) &&
      (!filters.maxRevenue || item.revenue <= parseInt(filters.maxRevenue));

    const matchesNetIncome = (!filters.minNetIncome || item.netIncome >= parseInt(filters.minNetIncome)) &&
      (!filters.maxNetIncome || item.netIncome <= parseInt(filters.maxNetIncome));

    return matchesYear && matchesRevenue && matchesNetIncome;
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Apple Inc. Financial Data</h1>

        {/* Filter Controls */}
        {!loading && !error && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
            <div className="space-y-2">
              <h3 className="font-semibold">Date Range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="startYear"
                  placeholder="Start Year"
                  value={filters.startYear}
                  onChange={handleFilterChange}
                  min="0"
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  name="endYear"
                  placeholder="End Year"
                  value={filters.endYear}
                  onChange={handleFilterChange}
                  min="0"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Revenue Range (USD)</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minRevenue"
                  placeholder="Min Revenue"
                  value={filters.minRevenue}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  name="maxRevenue"
                  placeholder="Max Revenue"
                  value={filters.maxRevenue}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Net Income Range (USD)</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minNetIncome"
                  placeholder="Min Net Income"
                  value={filters.minNetIncome}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  name="maxNetIncome"
                  placeholder="Max Net Income"
                  value={filters.maxNetIncome}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
          </div>
        )}

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Income</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Profit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EPS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operating Income</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.date}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.revenue)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.netIncome)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.grossProfit)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.eps}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.operatingIncome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
