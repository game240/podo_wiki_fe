import { format } from "date-fns";
import contents from "../assets/landing/contents.svg";

const Landing = () => {
  return (
    <main>
      <h1 className="font-36-700">포도위키:대문</h1>
      <p className="mt-[8px] mb-[24px] font-14-400 text-[#212529BF]">
        현재 시각:&nbsp;
        {format(new Date(), "yyyy-MM-dd HH:mm:ss")}
      </p>
      <section className="flex flex-col gap-[17px] mb-[14.4px]">
        <div className="flex items-center pl-[8px] w-full h-[23px] rounded-[6px] border-1 border-[#CCC] font-14-400">
          분류:&nbsp;
          <span className="text-[var(--blue)] font-14-400">포도위키</span>
        </div>
      </section>
      <hr className="border-[#CCC]" />

      <section className="flex flex-col items-center pb-[8px] mb-[8px] border-b-[1px] border-[#ccc]">
        <h3 className="mt-[8px] mb-[5px] font-21-700">
          연극인들의 <span className="text-[#6A39C0]">새로운 공간</span>
        </h3>
        <p className="font-15-400 mb-[15px]">
          포도위키에 오신 여러분을 환영합니다!
        </p>
        <p className="font-15-400 mb-[5px]">
          포도위키는 누구나 작성할 수 있는 공간입니다.
        </p>
        <p className="font-15-400">
          검증되지 않았거나 편향된 내용이 있을 수 있습니다.
        </p>
      </section>

      <img src={contents} alt="" />
    </main>
  );
};

export default Landing;
