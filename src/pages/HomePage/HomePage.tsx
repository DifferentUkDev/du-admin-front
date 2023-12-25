import MainLayout from "@/layouts/MainLayout/MainLayout";
import { FC } from "react";
import { Text } from "@chakra-ui/react";
interface IHomePageProps {

}

const HomePage:FC<IHomePageProps> = () => {

    return (
        <MainLayout>
            <Text as='h3' textStyle='h3'>Главная (пока пустая)</Text>
        </MainLayout>
    )
}

export default HomePage;
