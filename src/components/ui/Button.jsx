import React from "react";
import Icon from "@/components/ui/Icon";

const Button = ({
  children,
  variant = "full",
  color = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  icon = null,
  iconPosition = "left",
  type = "button",
}) => {
  // Tailwind size classes
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const colorClasses = {
    primary: "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600",
    success: "bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600",
    warning: "bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600",
    danger: "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600",
    info: "bg-cyan-500 text-white border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600",
    dark: "bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900",
    light: "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400",
  };

  const outlineClasses = {
    primary: "text-blue-500 border-blue-500 hover:bg-blue-50",
    success: "text-green-500 border-green-500 hover:bg-green-50",
    warning: "text-yellow-500 border-yellow-500 hover:bg-yellow-50",
    danger: "text-red-500 border-red-500 hover:bg-red-50",
    info: "text-cyan-500 border-cyan-500 hover:bg-cyan-50",
    dark: "text-gray-800 border-gray-800 hover:bg-gray-100",
    light: "text-gray-800 border-gray-300 hover:bg-gray-200",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center border font-medium rounded-md transition duration-300 ${
        variant === "outline" ? outlineClasses[color] : colorClasses[color]
      } ${sizeClasses[size]} ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
      }`}
    >
      {loading && (
        <svg
          style={{ display: "block", margin: "auto" }}
          className="animate-spin h-5 w-5 ltr:-ml-1 rtl:-mr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && iconPosition === "left" && (
        <span className="me-2">
          <Icon icon={icon} />
        </span>
      )}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && (
        <span className="ms-2">
          <Icon icon={icon} />
        </span>
      )}
    </button>
  );
};

export default Button;
