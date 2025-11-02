import MobileButton from "@/components/layout/mobile-button";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className={"min-h-screen flex flex-col mx-auto max-w-md bg-[#FBFCFF] font-sans pt-10 pb-20"}>
            <MobileButton />
            {children}
        </div>
    )
}

export default Layout