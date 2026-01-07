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

export type SelectUnitProps = Omit<
  React.ComponentPropsWithoutRef<"select">,
  "size"
>;

export interface InputIngredientProps {
  value: string;
  onChangeValue: (value: string) => void;
  dbIngredients: { id: number; name: string }[];
  placeholder?: string;
}
