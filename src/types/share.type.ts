export interface InputLabelProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

export interface UploadImageProps {
  isImage?: boolean;
  imageURL?: string;
  onImageChange: (file: File | null) => void;
}

export interface SelectLevelProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
