"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";
import { ArrowRight, UserRound, LockKeyhole, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Login = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const [isShowPass, setIsShhowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisButtonLogin, setIsDisButtonLogin] = useState(true);
  const [errorMessage, SetErrorMessage] = useState("");

  const IconShowPass = isShowPass ? Eye : EyeOff;
  useEffect(() => {
    setIsDisButtonLogin(email.trim() === "" || password.trim() === "");
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem("is_logged_in", "true");
      setUser(response.data.user);

      if (response.data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message;

        if (serverMessage === "Invalid email or password!") {
          SetErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        } else {
          SetErrorMessage("เกิดข้อผิดพลาดในเข้าสู่ระบบ");
        }
      } else {
        SetErrorMessage("การเชื่อมต่อขัดข้อง หรือเซิร์ฟเวอร์ไม่ตอบสนอง");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="flex flex-col items-center gap-12 px-20 py-12">
        <h1 className="text-5xl font-bold">เข้าสู่ระบบ</h1>
        {errorMessage.trim() !== "" && (
          <p className="bg-difficulty-hard rounded-md px-4 py-2 text-difficulty-hard-bg">
            {errorMessage}
          </p>
        )}
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
