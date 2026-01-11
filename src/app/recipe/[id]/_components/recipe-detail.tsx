"use client";
import {
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  Clock,
  Flame,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { RecipeSection } from "@/components/recipe-section";
import { IngredientsMatch, ReadRecipeByIdType } from "@/types/recipe.type";
import { RecipeService } from "@/services/recipe.service";
import { getLabel } from "@/utils/recipe-section";
import { levelsRecipes, unitsIngredients } from "@/data/constants";
import { useAuthStore } from "@/store/auth.store";
import { useUserIngreStore } from "@/store/user-ingredient.store";
import { CookingHistoryService } from "@/services/cooking-history.service";
import { LoadingChef } from "@/components/loading-chef";

const colorRecipeLevel: Record<string, string> = {
  easy: "text-difficulty-easy-bg bg-difficulty-easy",
  medium: "text-difficulty-medium-bg bg-difficulty-medium",
  hard: "text-difficulty-hard-bg bg-difficulty-hard",
};

export const RecipeDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const { user } = useAuthStore();
  const { userIngredients } = useUserIngreStore();

  const [dbRecipe, setDbRecipe] =
    useState<ReadRecipeByIdType<IngredientsMatch> | null>(null);

  const [loading, setLoading] = useState(false);
  const [cooking, setCooking] = useState(false);

  const displayLevel = dbRecipe ? getLabel(dbRecipe.level, levelsRecipes) : "";
  const isMatch = !user || userIngredients.length === 0 ? false : true;
  // Fetch recipe by id
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        await RecipeService.updateViewCountRecipe(Number(id));
        if (user) {
          const response = await RecipeService.fetchRecipeByIdForUser(
            Number(id),
          );
          setDbRecipe(response.data);
        } else {
          const response = await RecipeService.fetchRecipeById(Number(id));
          setDbRecipe(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleCooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (userIngredients.length === 0) {
      // toast.error("กรุณาเพิ่มวัตถุดิบในตู้เย็นก่อนเริ่มทำอาหาร");
      router.push("/");
      return;
    }

    setCooking(true);
    const startTime = Date.now();
    try {
      await CookingHistoryService.createCookingHid(Number(id));

      const elapsedTime = Date.now() - startTime;
      const minimumDelay = 1500; // 1.5s
      const waitTime = Math.max(0, minimumDelay - elapsedTime);
      if (elapsedTime < minimumDelay) {
        // Wait time
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCooking(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 px-8 py-2">
        <Card className="flex w-full max-w-300 animate-pulse flex-row gap-4 p-6">
          <div className="relative top-0 aspect-4/3 h-95 bg-gray-200" />
          <div className="flex w-full flex-col gap-5">
            <div className="h-10 w-3/4 rounded bg-gray-200" />

            <div className="text-muted-foreground flex items-center gap-4">
              <div className="h-4 w-2/6 rounded bg-gray-200" />
              <div className="h-4 w-2/6 rounded bg-gray-200" />
              <div className="h-4 w-2/6 rounded bg-gray-200" />
            </div>

            <div className="h-20 w-3/4 rounded bg-gray-200" />
          </div>
        </Card>
        <Card className="w-full max-w-300 animate-pulse p-6">
          <div className="h-10 w-1/6 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            <div className="h-16 rounded bg-gray-200" />
            <div className="h-16 rounded bg-gray-200" />
          </div>
        </Card>
        <Card className="w-full max-w-300 animate-pulse p-6">
          <div className="h-10 w-1/6 rounded bg-gray-200" />
          <div className="h-16 rounded bg-gray-200" />
        </Card>
      </div>
    );
  }

  // Not found data in databse
  if (!dbRecipe) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="text-xl font-medium text-gray-500">
          ไม่พบข้อมูลเมนูอาหารนี้
        </p>
        <Button onClick={() => router.push("/")}>กลับไปหน้าหลัก</Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-6 px-8 py-2">
      <Link href="/" className="w-full">
        <section className="flex w-full items-center gap-2">
          <ArrowLeft />
          <p>ย้อนกลับ</p>
        </section>
      </Link>

      {/* Image and Info */}
      <Card className="flex w-full max-w-300 flex-row gap-4 p-6">
        <div className="relative top-0 aspect-4/3 h-95">
          <Image
            src={dbRecipe.imageUrl}
            alt="Recpe image preview"
            fill
            className="object-contain object-top"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">{dbRecipe.name}</h1>
          <div className="text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {dbRecipe.cookTime} นาที
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {dbRecipe.servings} ที่
            </span>
            <span className="flex items-center gap-1">
              <Flame size={14} />
              {dbRecipe.calorie} kcal
            </span>
            <Badge className={` ${colorRecipeLevel[dbRecipe.level]}`}>
              {displayLevel}
            </Badge>
          </div>
          <div>
            <h2 className="mb-1 text-3xl font-medium">คำอธิบาย</h2>
            <p>{dbRecipe.description}</p>
          </div>
        </div>
      </Card>
      {/* Ingredient */}
      <RecipeSection title="วัตถุดิบ">
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
          {dbRecipe.ingredients.map((ingredient, index) => {
            const displayUnit = getLabel(ingredient.unit, unitsIngredients);
            return (
              <div
                key={index}
                className="flex h-16 items-center justify-between rounded-md border border-transparent bg-gray-50 p-3 transition-colors hover:border-gray-200"
              >
                <div className="flex items-center gap-3">
                  {!isMatch ? (
                    <div className="h-5 w-5 rounded-full border-2 border-slate-200" />
                  ) : ingredient.status === "available" ? (
                    <CheckCircle2 className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                  <span className="font-medium">{ingredient.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">
                    {ingredient.requiredAmount} {displayUnit}
                  </span>
                  {isMatch && ingredient.status !== "available" && (
                    <p className="text-xs text-red-500">
                      (ขาด {ingredient.shortageAmount} {displayUnit})
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </RecipeSection>

      {/* Instruction */}
      <RecipeSection title="วิธีทำ">
        <section className="flex flex-col gap-4">
          {dbRecipe.instructions.map((instruction, index) => (
            <div
              key={index}
              className="bg-background flex items-center gap-4 rounded-md p-3"
            >
              <div className="bg-secondary-surface flex h-8 w-8 items-center justify-center rounded-full text-xl font-medium">
                <p className="text-center">{index + 1}</p>
              </div>
              <div className="border-border min-h-16 w-full rounded-md border bg-white px-3 py-2 shadow-xs">
                <p>{instruction}</p>
              </div>
            </div>
          ))}
        </section>
      </RecipeSection>

      {/* Button section */}
      <div className="flex items-center gap-4">
        <Button onClick={() => router.push("/")} variant="outline">
          กลับไปยังรายการ
        </Button>
        <Button onClick={handleCooking}>
          <ChefHat />
          <span>เริ่มทำอาหาร</span>
        </Button>
      </div>

      {cooking && <LoadingChef />}
    </div>
  );
};
