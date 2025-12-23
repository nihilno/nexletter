import Cards from "@/components/dashboard/cards";
import Explanation from "@/components/dashboard/explanation";
import Title from "@/components/dashboard/title";

export default function DashboardPage() {
  return (
    <section className="scroll-mt-24 py-8">
      <div className="px-4">
        <Title subtitle="Manage your personalized newsletter preferences.">
          Your <span className="text-primary">Newsletter</span>
          <br /> Dashboard
        </Title>
        <Cards />
      </div>
      <Explanation />
    </section>
  );
}
