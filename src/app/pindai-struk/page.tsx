
import Navbar from "@/components/layout/navbar";
import CameraScanner from "@/components/utils/camera-scanner";


export default function Profile() {

  return (
    <div className="min-h-screen bg-[#FBFCFF] font-sans">
      <Navbar title="Pindai Struk" />
      <div className="mx-auto flex flex-col h-full">
        <CameraScanner />
      </div>
    </div>
  );
}
