"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthService } from "@/services/auth.service";
import axios from "axios";
import { ArrowRight, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Register = () => {
  const [isShowPass, setIsShhowPass] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisButtonRegister, setIsDisButtonRegister] = useState(true);
  const [errorMessage, SetErrorMessage] = useState("");

  const router = useRouter();
  const IconShowPass = isShowPass ? Eye : EyeOff;

  useEffect(() => {
    setIsDisButtonRegister(
      Object.values(form).some((value) => value.trim() === ""),
    );
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    SetErrorMessage("");
    setLoading(true);
    try {
      await AuthService.register(form);
      router.push("/login");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message;

        if (serverMessage === "Email already exists") {
          SetErrorMessage("อีเมลนี้มีการลงทะเบียนแล้ว");
        } else {
          SetErrorMessage("เกิดข้อผิดพลาดในการลงทะเบียน");
        }
      } else {
        SetErrorMessage("การเชื่อมต่อขัดข้อง");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="flex flex-col items-center gap-12 px-20 py-12">
        <h1 className="text-5xl font-bold">ลงทะเบียน</h1>
        {errorMessage.trim() !== "" && (
          <p className="bg-text-difficulty-hard rounded-md px-4 py-2 text-difficulty-hard-bg">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label>
              <p>ชื่อจริง</p>
              <Input
                type="text"
                value={form.firstName}
                name="firstName"
                onChange={handleChange}
                placeholder="กรอกชื่อจริง"
              />
            </label>
            <label>
              <p>นามสกุล</p>
              <Input
                type="text"
                value={form.lastName}
                name="lastName"
                onChange={handleChange}
                placeholder="กรอกนามสกุล"
              />
            </label>
          </div>
          <label>
            <p>อีเมล</p>
            <Input
              type="email"
              value={form.email}
              name="email"
              onChange={handleChange}
              placeholder="example@example.com"
            />
          </label>
          <label>
            <p>รหัสผ่าน</p>
            <div className="relative">
              <Input
                type={isShowPass ? "text" : "password"}
                value={form.password}
                name="password"
                onChange={handleChange}
                placeholder="กรอกนามสกุล"
              />
              <IconShowPass
                onClick={() => setIsShhowPass(!isShowPass)}
                size={16}
                strokeWidth={2}
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              />
            </div>
          </label>

          <Button type="submit" disabled={isDisButtonRegister}>
            {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </Button>
          {/* <p className="text-muted-foreground">Forgot Username Password?</p> */}
        </form>
        <Link href="/login">
          <div className="text-muted-foreground flex cursor-pointer items-center gap-1 hover:text-blue-500 hover:underline">
            <p>เข้าสู่ระบบ </p>
            <ArrowRight />
          </div>
        </Link>
      </Card>
    </div>
  );
};
