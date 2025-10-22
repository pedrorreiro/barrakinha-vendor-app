type Variant = "primary" | "secondary" | "outline";
type Size = "small" | "medium" | "large";

export const getButtonClasses = (
  variant: Variant,
  size: Size,
  disabled: boolean,
  className: string
): string => {
  const baseClasses = "flex-row items-center justify-center rounded-lg";

  const variantClasses = {
    primary: "bg-primary",
    secondary: "bg-gray-500",
    outline: "bg-transparent border border-primary",
  };

  const sizeClasses = {
    small: "py-2 px-4",
    medium: "py-4 px-6",
    large: "py-5 px-8",
  };

  const disabledClasses = disabled ? "opacity-50" : "";

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`.trim();
};

export const getTextClasses = (
  variant: Variant,
  size: Size,
  disabled: boolean,
  textClassName: string
): string => {
  const baseClasses = "font-bold text-center";

  const variantClasses = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-[#F82E08]",
  };

  const sizeClasses = {
    small: "text-sm leading-[18px]",
    medium: "text-base leading-[22px]",
    large: "text-lg leading-6",
  };

  const disabledClasses = disabled ? "opacity-70" : "";

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${textClassName}`.trim();
};
