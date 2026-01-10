import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const LoadingChef = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="h-64 md:h-80">
        <DotLottieReact src="/prepare-food.json" loop autoplay />
      </div>
      <p className="mt-4 animate-pulse text-lg font-medium text-slate-700">
        เชฟกำลังเตรียมสูตรอาหารให้คุณ...
      </p>
    </div>
  );
};
