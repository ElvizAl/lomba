import MobileButton from "@/components/layout/mobile-button";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col mx-auto max-w-md bg-[#FBFCFF] font-sans px-4 pt-10">
            <MobileButton   />
            {children}
        </div>
    )
}

export default Layout