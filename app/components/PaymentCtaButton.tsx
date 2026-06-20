"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type PaymentCtaButtonProps = {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "onClick" | "type">;

export function PaymentCtaButton({
  children,
  className = "",
  size = "lg",
  disabled,
  onClick,
  type = "button",
}: PaymentCtaButtonProps) {
  return (
    <div
      className={`payment-glow-shell payment-cta-shell ${size === "md" ? "payment-cta-shell--md" : "payment-cta-shell--lg"} ${className}`.trim()}
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
