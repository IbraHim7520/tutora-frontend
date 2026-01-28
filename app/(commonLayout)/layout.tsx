import Footer from "@/components/Footer";
import { Navbar1 } from "@/components/navbar1";

const CommonLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar1></Navbar1>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default CommonLayout;