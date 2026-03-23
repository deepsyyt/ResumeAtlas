import { resolveRazorpayCurrency } from "./razorpayConfig";

/**
 * Credit packs for one-time Razorpay orders.
 * Amount is in smallest currency unit: USD cents or INR paise.
 */
export function formatCreditPackPrice(
  amountMinor: number,
  currency: string
): string {
  const major = amountMinor / 100;
  try {
    const locale = currency === "INR" ? "en-IN" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "INR" ? 0 : 2,
      maximumFractionDigits: currency === "INR" ? 0 : 2,
    }).format(major);
  } catch {
    return `${currency} ${major.toFixed(currency === "INR" ? 0 : 2)}`;
  }
}

/** USD amounts (cents). For Razorpay International. */
const PACKAGES_USD = {
  starter: { credits: 1, amount: 299 },
  jobseeker: { credits: 5, amount: 999 },
  power: { credits: 15, amount: 2499 },
} as const;

/** INR amounts (paise). ~₹249, ₹849, ₹2099. For Razorpay India. */
const PACKAGES_INR = {
  starter: { credits: 1, amount: 24900 },
  jobseeker: { credits: 5, amount: 84900 },
  power: { credits: 15, amount: 209900 },
} as const;

function buildPackages(currency: "USD" | "INR") {
  const amounts = currency === "INR" ? PACKAGES_INR : PACKAGES_USD;
  return {
    starter: {
      id: "starter" as const,
      name: "Starter",
      credits: amounts.starter.credits,
      razorpayAmount: amounts.starter.amount,
      currency,
    },
    jobseeker: {
      id: "jobseeker" as const,
      name: "Job Seeker",
      credits: amounts.jobseeker.credits,
      razorpayAmount: amounts.jobseeker.amount,
      currency,
    },
    power: {
      id: "power" as const,
      name: "Power Pack",
      credits: amounts.power.credits,
      razorpayAmount: amounts.power.amount,
      currency,
    },
  };
}

/** Packages in active currency (USD or INR via RAZORPAY_CURRENCY / NEXT_PUBLIC_RAZORPAY_CURRENCY). */
export const CREDIT_PACKAGES = (() => {
  const currency = resolveRazorpayCurrency();
  return buildPackages(currency);
})();

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
