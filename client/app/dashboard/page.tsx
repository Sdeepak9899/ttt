import { Suspense } from "react";
import DashboardMain from "@/components/dashboard/dashboardmain";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardMain />
    </Suspense>
  );
}