import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { date: '10:00', amount: 0 },
  { date: '11:00', amount: 2 },
  { date: '12:00', amount: 3 },
  { date: '13:00', amount: 3.5 },
  { date: '14:00', amount: 4 },
  { date: '15:00', amount: 4.5 },
  { date: '16:00', amount: 5 },
];

export function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Revenue Statistics</h3>
        <p className="text-2xl font-bold mt-1">NGN 100.18</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickMargin={8}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickMargin={8}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}