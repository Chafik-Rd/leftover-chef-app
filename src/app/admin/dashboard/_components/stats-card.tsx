import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StatsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card className="border-secondary-surface shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#A67B5B]">
          {title}
        </CardTitle>
        <div className="text-[#8B5E3C]">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#8B5E3C]">{value}</div>
      </CardContent>
    </Card>
  );
};
