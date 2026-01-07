"use client";
import { ChevronDownIcon } from "lucide-react";
import { InputLable } from "../input-label";
import { SelectUnit } from "../select-unit";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import { InputIngredient } from "../input-Ingredient";
import {
  CreateUserIngredientType,
  FormUserIngredientType,
} from "@/types/user-ingredient.type";
import { IngredientService } from "@/services/ingredient.service";
import { UserIngredientService } from "@/services/user-ingredient.service";
import { useUserIngreStore } from "@/store/user-ingredient.store";

export const AddUserIngredient = ({
  onSetIsUserIngre,
}: {
  onSetIsUserIngre: (value: boolean) => void;
}) => {
  const { setUserIngredient } = useUserIngreStore();
  const defaultForm: FormUserIngredientType = {
    name: "",
    amount: 0,
    unit: "piece",
    expiryDate: undefined,
  };
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormUserIngredientType>(defaultForm);
  const [dbIngredients, setDbIngredients] = useState<
    { id: number; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isSave, setIsSave] = useState(false);

  // Read ingredient from database
  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await IngredientService.getAllIngredient();
      setDbIngredients(response.data);
    };
    fetchIngredients();
  }, []);

  // Function set data in form when change input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate recipe form
  useEffect(() => {
    const validateUserIngreForm = (form: FormUserIngredientType) => {
      const hasForm =
        form.name.trim() !== "" &&
        form.unit.trim() !== "" &&
        form.amount > 0 &&
        form.expiryDate !== undefined;

      return hasForm;
    };
    setIsSave(validateUserIngreForm(form));
  }, [form]);

  // Function handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSave || !form.expiryDate) return;
    setLoading(true);
    try {
      const payloadDate = new Date(form.expiryDate);
      payloadDate.setHours(12, 0, 0, 0);
      const payload: CreateUserIngredientType = {
        ...form,
        expiryDate: payloadDate.toISOString(),
      };
      const response =
        await UserIngredientService.createUserIngredient(payload);
      if (response.success) {
        const response = await UserIngredientService.getUserIngredient();
        setUserIngredient(response.data);
        setForm(defaultForm);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/80">
      <Card className="flex w-full max-w-90 flex-col justify-center gap-6 px-8 py-6">
        <h2 className="text-center text-3xl font-bold">เพิ่มวัตถุดิบ</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            <span>ชื่อวัตถุดิบ</span>
            <InputIngredient
              value={form.name}
              onChangeValue={(newValue) => setForm({ ...form, name: newValue })}
              dbIngredients={dbIngredients}
            />
          </label>
          <div className="flex items-center gap-2">
            <InputLable
              label="จำนวน"
              type="number"
              min={0}
              value={form.amount}
              name="amount"
              onChange={handleChange}
              placeholder="2"
            />
            <label>
              <span>หน่วย</span>
              <SelectUnit
                value={form.unit}
                name="unit"
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span>วันหมดอายุ</span>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between text-sm"
                >
                  {form.expiryDate
                    ? new Date(form.expiryDate).toLocaleDateString("th-TH")
                    : "เลือกวันหมดอายุ"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={form.expiryDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setForm({ ...form, expiryDate: date });
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </label>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" onClick={() => onSetIsUserIngre(false)}>
              ยกเลิก
            </Button>
            <Button disabled={!isSave}>{loading ? "กำลังเพิ่ม..." : "เพิ่ม"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
