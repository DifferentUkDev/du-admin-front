import { FC, ReactElement, useState } from "react";
import Header from "../Header/Header";
import { HStack } from "@chakra-ui/react";
import Sidebar from "../Sidebar/SideBar";

interface IMainLayotProps {
    children: ReactElement;
}

const MainLayout:FC<IMainLayotProps> = ({children}) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(true);
    
    return (
        <>
            <Header isOpen={isOpen} onToggle={setIsOpen} />
            <HStack spacing={4} alignItems='normal'>
                <Sidebar isOpen={isOpen} />
                {children}
            </HStack>
            
        </>
    )
}

export default MainLayout;
