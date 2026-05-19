"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { year: "2021", patients: 1200 },
  { year: "2022", patients: 2100 },
  { year: "2023", patients: 3200 },
  { year: "2024", patients: 4600 },
  { year: "2025", patients: 5900 },
];

export const StatisticsSection = () => {
  return (
    <section className="min-h-screen bg-white px-6 md:px-16 lg:px-32 py-20 flex items-center">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* Left Content */}
        <div className="flex flex-col gap-8">

          <span className="text-[#409D9B] font-bold tracking-[4px] uppercase">
            Statistics
          </span>

          <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-800">
            Trusted By Thousands Of Patients
          </h2>

          <p className="text-gray-600 text-lg leading-9">
            Our clinic has successfully helped thousands of patients
            improve their vision through advanced treatments and
            specialized eye care services.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-5">

            <div className="bg-[#EBFFF5] p-6 rounded-3xl">
              <h3 className="text-5xl font-black text-[#409D9B]">
                15K+
              </h3>

              <p className="text-gray-600 mt-2">
                Happy Patients
              </p>
            </div>

            <div className="bg-[#EBFFF5] p-6 rounded-3xl">
              <h3 className="text-5xl font-black text-[#409D9B]">
                98%
              </h3>

              <p className="text-gray-600 mt-2">
                Success Rate
              </p>
            </div>

          </div>
        </div>

        {/* Chart */}
        <div className="bg-white shadow-2xl rounded-[40px] p-6 h-112.5">

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="year" />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="patients"
                stroke="#409D9B"
                fill="#409D9B"
                fillOpacity={0.2}
                strokeWidth={4}
              />
            </AreaChart>
          </ResponsiveContainer>

        </div>
      </div>
    </section>
  );
};