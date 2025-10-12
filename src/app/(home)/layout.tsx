import MobileButton from "@/components/layout/mobile-button";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col">
            <MobileButton   />
            {children}
        </div>
    )
}

export default Layout