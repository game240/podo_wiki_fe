import logo from "./../assets/logo.svg";

const NavBar = () => {
  return (
    <nav
      className="flex justify-between items-center pl-[13.802083333333333333333333333333%] pr-[13.541666666666666666666666666667%] w-full h-[56px]"
      style={{
        background:
          "linear-gradient(90deg, #6A39C0 0%, #6A39C0 50%, #3C6FE5 100%)",
      }}
    >
      <div className="flex items-center gap-[10px]">
        <img src={logo} alt="logo" />
        <h1 className="text-white font-25-700">포도위키</h1>
      </div>
      <button className="w-[98px] h-[40px] rounded-[6px] border-1 border-[#CCC] bg-white cursor-pointer font-15-400">
        로그인
      </button>
    </nav>
  );
};

export default NavBar;
