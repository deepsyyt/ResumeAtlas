"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS } from "@/app/lib/analyticsEvents";
import { gtagEvent } from "@/app/lib/gtagClient";

type Surface = "workbench" | "methodology" | "role_hub";

/**
 * Surface view (workbench/methodology only) + delegated CTA clicks for data-analytics-event.
 */
export function PostingFitAnalyticsRoot({ surface }: { surface: Surface }) {
  useEffect(() => {
    if (surface === "workbench") {
      gtagEvent(ANALYTICS_EVENTS.postingFitWorkbenchSurfaceViewed, {});
    } else if (surface === "methodology") {
      gtagEvent(ANALYTICS_EVENTS.postingFitMethodologySurfaceViewed, {});
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(
        "[data-analytics-event]"
      ) as HTMLElement | null;
      if (!el) return;
      const name = el.getAttribute("data-analytics-event");
      const location = el.getAttribute("data-analytics-location") ?? "";
      if (name === ANALYTICS_EVENTS.postingFitTierSCtaClicked) {
        gtagEvent(ANALYTICS_EVENTS.postingFitTierSCtaClicked, { location });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [surface]);

  return null;
}