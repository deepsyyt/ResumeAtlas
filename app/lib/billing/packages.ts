/**
 * Credit packs for one-time Razorpay orders.
 * `razorpayAmount` is the smallest currency unit (USD cents).
 */
export function formatCreditPackPrice(
  amountMinor: number,
  currency: string
): string {
  const major = amountMinor / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(major);
  } catch {
    return `${currency} ${major.toFixed(2)}`;
  }
}

export const CREDIT_PACKAGES = {
  starter: {
    id: "starter",
    name: "Starter",
    credits: 1,
    razorpayAmount: 299,
    currency: "USD" as const,
  },
  jobseeker: {
    id: "jobseeker",
    name: "Job Seeker",
    credits: 5,
    razorpayAmount: 999,
    currency: "USD" as const,
  },
  power: {
    id: "power",
    name: "Power Pack",
    credits: 15,
    razorpayAmount: 2499,
    currency: "USD" as const,
  },
} as const;

export type CreditPackageId = keyof typeof CREDIT_PACKAGES;

export function getCreditPackage(id: string) {
  if (id in CREDIT_PACKAGES) {
    return CREDIT_PACKAGES[id as CreditPackageId];
  }
  return null;
}

export function listCreditPackages() {
  return Object.values(CREDIT_PACKAGES);
}
