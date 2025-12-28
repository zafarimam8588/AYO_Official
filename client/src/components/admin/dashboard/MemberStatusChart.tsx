import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MemberStatusChartProps {
  approved: number;
  pending: number;
  rejected: number;
  loading?: boolean;
}

const COLORS = {
  approved: "#138808", // india-green-500
  pending: "#f59e0b", // amber-500
  rejected: "#ef4444", // red-500
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { name: string; value: number; color: string };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-slate-200">
        <p className="text-sm font-medium text-slate-700">{data.name}</p>
        <p className="text-lg font-bold" style={{ color: data.payload.color }}>
          {data.value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

export function MemberStatusChart({
  approved,
  pending,
  rejected,
  loading = false,
}: MemberStatusChartProps) {
  const total = approved + pending + rejected;

  const data = [
    { name: "Approved", value: approved, color: COLORS.approved },
    { name: "Pending", value: pending, color: COLORS.pending },
    { name: "Rejected", value: rejected, color: COLORS.rejected },
  ].filter((item) => item.value > 0);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-5 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <div className="flex justify-center gap-6 mt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-india-green-100 rounded-lg">
            <Users className="w-5 h-5 text-india-green-600" />
          </div>
          <CardTitle className="text-lg font-semibold text-slate-800">
            Member Status
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">{total}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-4 flex-wrap">
          {[
            { name: "Approved", value: approved, color: COLORS.approved },
            { name: "Pending", value: pending, color: COLORS.pending },
            { name: "Rejected", value: rejected, color: COLORS.rejected },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-600">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
