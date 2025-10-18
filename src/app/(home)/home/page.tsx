import Image from "next/image";

export default function Home() {
  return (
   <div className="min-h-screen max-w-sm mx-auto flex flex-col bg-[#FBFCFF] font-sans">
    <div className=" flex my-5">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-20 h-20"
        />
      </div>
   </div>
  );
}
