import { Navbar1 } from "@/components/navbar1";

const CommonLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar1></Navbar1>
            {children}
        </div>
    );
};

export default CommonLayout;