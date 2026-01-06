import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, ShoppingBasket, Users, TrendingUp } from "lucide-react";
import { StatsCard } from "./statsCard";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-primary text-3xl font-medium">สรุปภาพรวมระบบ</h2>

      {/* ส่วนที่ 1: Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="สูตรอาหารทั้งหมด" value="124" icon={<Utensils />} />
        <StatsCard
          title="วัตถุดิบในคลัง"
          value="45"
          icon={<ShoppingBasket />}
        />
        <StatsCard title="ยอดเข้าชมรวม" value="12.5k" icon={<TrendingUp />} />
        <StatsCard title="สมาชิก" value="850" icon={<Users />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* ส่วนที่ 2: กราฟ (สมมติใช้ Placeholder) */}
        <Card className="border-secondary-surface col-span-4">
          <CardHeader>
            <CardTitle className="text-[#8B5E3C]">
              สถิติการเพิ่มสูตรอาหาร
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-[#E8D5C4] bg-[#FDF8F3]">
              [พื้นที่สำหรับแผนภูมิแท่ง]
            </div>
          </CardContent>
        </Card>

        {/* ส่วนที่ 3: กิจกรรมล่าสุด */}
        <Card className="border-secondary-surface col-span-3">
          <CardHeader>
            <CardTitle className="text-[#8B5E3C]">รายการล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* ลิสต์รายการสั้นๆ */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <div className="h-10 w-10 rounded-md bg-[#E8D5C4]" />
                  <div className="flex-1">
                    <p className="font-medium">เมนูไข่เจียวสมุนไพร</p>
                    <p className="text-muted-foreground text-xs">
                      เพิ่มเมื่อ 2 ชม. ที่แล้ว
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

