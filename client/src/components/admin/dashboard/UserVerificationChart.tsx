import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UserVerificationChartProps {
  verified: number;
  unverified: number;
  loading?: boolean;
}

const COLORS = {
  verified: "#138808", // india-green-500
  unverified: "#f59e0b", // amber-500
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { name: string; value: number; fill: string };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-slate-200">
        <p className="text-sm font-medium text-slate-700">
          {data.payload.name}
        </p>
        <p className="text-lg font-bold" style={{ color: data.payload.fill }}>
          {data.value.toLocaleString()} users
        </p>
      </div>
    );
  }
  return null;
}

export function UserVerificationChart({
  verified,
  unverified,
  loading = false,
}: UserVerificationChartProps) {
  const total = verified + unverified;
  const verifiedPercent = total > 0 ? Math.round((verified / total) * 100) : 0;

  const data = [
    { name: "Verified", value: verified, fill: COLORS.verified },
    { name: "Unverified", value: unverified, fill: COLORS.unverified },
  ];

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-5 w-36" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[120px] w-full rounded-lg" />
          <div className="flex justify-between mt-4 px-2">
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-12 w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-slate-800">
              User Verification
            </CardTitle>
          </div>
          <span className="text-sm text-slate-500">
            {verifiedPercent}% verified
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data} layout="vertical" barSize={28}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={80}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Stat summary */}
        <div className="flex justify-between mt-4 px-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-india-green-600">
              {verified}
            </p>
            <p className="text-xs text-slate-500">Verified</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-500">{unverified}</p>
            <p className="text-xs text-slate-500">Unverified</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-700">{total}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
