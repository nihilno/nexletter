import Cards from "@/components/dashboard/cards";
import Explanation from "@/components/dashboard/explanation";
import { Loader } from "@/components/dashboard/skeletons";
import Title from "@/components/dashboard/title";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <section className="scroll-mt-24 py-8">
      <div className="px-4">
        <Title subtitle="Manage your personalized newsletter preferences.">
          Your <span className="text-primary">Newsletter</span>
          <br /> Dashboard
        </Title>
        <Suspense fallback={<Loader />}>
          <Cards />
        </Suspense>
      </div>
      <Explanation />
    </section>
  );
}
