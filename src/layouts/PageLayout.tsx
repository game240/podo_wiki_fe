import { Outlet } from "react-router-dom";
import PageBlock from "../components/PageBlock";

const PageLayout = () => {
  return (
    <main className="flex justify-center gap-[20px] pt-[20px]">
      <PageBlock className="mb-[200px] w-[54.427083333333333333333333333333%] min-h-[984px] p-[24px]">
        <Outlet />
      </PageBlock>
      <PageBlock className="w-[335px] h-[399px] p-[20px]"></PageBlock>
    </main>
  );
};

export default PageLayout;
