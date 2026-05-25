import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
}

export function DashboardCard({title, value, icon: Icon}: Props) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            {title}
          </p>
          <h2 className="text-4xl font-black mt-2">
            {value}
          </h2>
        </div>
        <div className="size-14 rounded-2xl bg-[#409D9B] text-white flex items-center justify-center">
          <Icon className="size-7" />
        </div>
      </div>
    </div>
  );
}