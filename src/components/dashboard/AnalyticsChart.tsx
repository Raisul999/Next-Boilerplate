"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { data } from "@/data/analytics";


const AnalyticsChart = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">Analytics for this year</CardTitle>
          <CardDescription className="capitalize">
            Views per month
          </CardDescription>
        </CardHeader>
        <CardDescription>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardDescription>
      </Card>
    </>
  );
};

export default AnalyticsChart;
