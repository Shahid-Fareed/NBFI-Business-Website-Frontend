import { RxCrossCircled } from "react-icons/rx";

const Popup = ({ children, openPopup, setOpenPopup }: any) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full z-[999] bg-[rgba(0,0,0,.5)] ${openPopup ? "" : "hidden"
          }`}
      >
        <RxCrossCircled onClick={(e) => {
          e.stopPropagation();
          setOpenPopup(false);
        }} className="text-4xl text-white fixed right-5 top-12 cursor-pointer" />
        {children}
      </div>
    </>
  );
};

export default Popup;
