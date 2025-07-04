import { useNavigate } from "react-router-dom";
import WikiViewer from "../components/WikiViewer";

const WikiPage = () => {
  const navigate = useNavigate();
  return (
    <main className="size-full">
      <div className="flex justify-between items-center">
        <h1 className="font-36-700">포도위키</h1>
        <button
          className="w-[74px] h-[36px] font-15-400 rounded-[6px] border-1 border-[#CCC] bg-white cursor-pointer"
          onClick={() => navigate("/editor")}
        >
          편집
        </button>
      </div>
      <p className="mt-[8px] mb-[24px] font-14-400 text-[#212529BF]">
        최근 수정 시각: 2025-05-07 13:45:27
      </p>

      <section className="flex flex-col gap-[17px]">
        <div className="flex items-center pl-[8px] w-full h-[23px] rounded-[6px] border-1 border-[#CCC] font-14-400">
          분류:&nbsp;<p className="text-[var(--blue)] font-14-400">연극 단체</p>
        </div>
      </section>
      <WikiViewer />
    </main>
  );
};

export default WikiPage;
