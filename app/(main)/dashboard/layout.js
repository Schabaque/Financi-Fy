import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="">
      
      {/*//Suspense is used to handle loading states for server components
      //It allows the component to be rendered asynchronously, which is useful for server-side rendering
      //The fallback prop is used to specify the component to render while the main component is loading*/}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}