import { FC } from "react";
import { Link } from "react-router-dom";
import { Text } from '@chakra-ui/react';

interface IHrefPageProps {

}

const HrefPage:FC<IHrefPageProps> = () => {

    return (
        <>
            <Text textStyle='h2' color='primary.400'>Админ панель</Text>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '30px', maxWidth: 'fit-content'}}>
                <Link to='/login'><Text textStyle='p'>Страница логина</Text></Link>
            </div>
        </>
    )
}

export default HrefPage;