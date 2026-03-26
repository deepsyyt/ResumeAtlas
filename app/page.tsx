import type { Metadata } from "next";
import Home from "./HomeClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <Home />;
}
