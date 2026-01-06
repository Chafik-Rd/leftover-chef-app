"use client";

import { Card } from "@/components/ui/card";
import { UploadImageProps } from "@/types/share.type";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const UploadImage = ({
  onImageChange,
  isImage,
  imageURL,
}: UploadImageProps) => {
  const [preview, setPreview] = useState("");

  // Clean up preview URL when isImage changes to false
  useEffect(() => {
    const cleanImageURL = () => {
      if (!isImage && imageURL === undefined) {
        setPreview((currentPreview) => {
          if (currentPreview !== "") {
            URL.revokeObjectURL(currentPreview);
            return "";
          }
          return currentPreview;
        });
      }
    };
    cleanImageURL();
  }, [isImage, imageURL]);

  // Set imageURL for previw when edit
  useEffect(() => {
    const stImageURL = () => {
      if (imageURL && isImage === undefined) {
        setPreview((currentPreview) => {
          URL.revokeObjectURL(currentPreview);
          return imageURL;
        });
      }
    };
    stImageURL();
  }, [imageURL, isImage]);

  // Handle preview image
  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (file) {
      // Delete old preview URL to avoid memory leak
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      // Create url for preview image
      setPreview(URL.createObjectURL(file));

      // Set image in form
      onImageChange(file);
    }
  };
  return (
    <Card className="w-full p-6">
      {preview ? (
        <label
          htmlFor="file-upload"
          className="relative block h-110 w-full cursor-pointer overflow-hidden rounded-lg"
        >
          <Image
            src={preview}
            alt="Recpe image preview"
            fill
            className="object-contain"
          />
        </label>
      ) : (
        <label
          htmlFor="file-upload"
          className="border-border text-muted-foreground flex h-110 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed"
        >
          <ImagePlus size={48} strokeWidth={1.5} />
          <p>โหลดไฟล์หรือลากวาง PNG, JPG, GIF up to 10MB</p>
        </label>
      )}
      <input
        id="file-upload"
        type="file"
        onChange={handlePreview}
        accept="image/png,image/jpeg"
        className="hidden"
      />
    </Card>
  );
};
