"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type PaymentCtaButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
  /** White button for dark card backgrounds; default glow pill for light contexts */
  variant?: "glow" | "solid";
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "onClick" | "type">;

export function PaymentCtaButton({
  children,
  className = "",
  size = "lg",
  variant = "glow",
  disabled,
  onClick,
  type = "button",
}: PaymentCtaButtonProps) {
  if (variant === "solid") {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`payment-cta-button--solid ${
          size === "md"
            ? "payment-cta-button--solid-md"
            : size === "xl"
              ? "payment-cta-button--solid-xl"
              : "payment-cta-button--solid-lg"
        } ${className}`.trim()}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={`payment-glow-shell payment-cta-shell ${
        size === "md"
          ? "payment-cta-shell--md"
          : size === "xl"
            ? "payment-cta-shell--xl"
            : "payment-cta-shell--lg"
      } ${className}`.trim()}
    >
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="payment-cta-button"
      >
        {children}
      </button>
    </div>
  );
}
