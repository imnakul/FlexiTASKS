import { AuroraHero } from "./ui/futuristic-hero-section";
import { FlexiTasksHero } from "./ui/FlexiTasksHero";

const Demo = () => {
  return (
    <div className="w-full">
      {/* This is the customized FlexiTasks version */}
      <FlexiTasksHero />
      
      {/* Uncomment to see the original Aurora Hero */}
      {/* <AuroraHero /> */}
    </div>
  );
};

export { Demo };
