import clsx from "clsx";

const PageBlock = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <main
      className={clsx(
        "rounded-[6px] border-1 border-[#CCC] bg-white",
        className
      )}
      {...props}
    ></main>
  );
};

export default PageBlock;
