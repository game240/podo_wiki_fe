import { Outlet } from "react-router-dom";
import PageBlock from "../components/PageBlock";

const PageLayout = () => {
  return (
    <main className="flex justify-center gap-[20px] pt-[20px]">
      <PageBlock className="w-[54.427083333333333333333333333333%] min-h-[984px]">
        <Outlet />
      </PageBlock>
      <PageBlock className="w-[335px] h-[399px]"></PageBlock>
    </main>
  );
};

export default PageLayout;
