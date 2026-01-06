"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth.service";
import { ArrowRight, UserRound, LockKeyhole, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Login = () => {
  const [isShowPass, setIsShhowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisButtonLogin, setIsDisButtonLogin] = useState(true);

  const IconShowPass = isShowPass ? Eye : EyeOff;
  useEffect(() => {
    setIsDisButtonLogin(email.trim() === "" || password.trim() === "");
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await AuthService.login(email, password);
      console.log(user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="flex flex-col items-center gap-12 px-20 py-12">
        <h1 className="text-5xl font-bold">เข้าสู่ระบบ</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="relative">
            <UserRound
              size={16}
              strokeWidth={2}
              className="absolute top-1/2 left-2 -translate-y-1/2"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="pl-8"
            />
          </label>
          <label className="relative">
            <LockKeyhole
              size={16}
              strokeWidth={2}
              className="absolute top-1/2 left-2 -translate-y-1/2"
            />
            <Input
              type={isShowPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              className="pl-8"
            />

            <IconShowPass
              onClick={() => setIsShhowPass(!isShowPass)}
              size={16}
              strokeWidth={2}
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
            />
          </label>

          <Button type="submit" disabled={isDisButtonLogin}>
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </Button>
          {/* <p className="text-muted-foreground">Forgot Username Password?</p> */}
        </form>
        <Link href="/register">
          <div className="text-muted-foreground flex cursor-pointer items-center gap-1 hover:text-blue-500 hover:underline">
            <p>สร้างบัญชีของคุณ </p>
            <ArrowRight />
          </div>
        </Link>
      </Card>
    </div>
  );
};
