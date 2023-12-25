/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { neVer, ver, verTasks } from "@/utils/blago";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface IBlagoUsersPageProps {

}

const BlagoUsersPage:FC<IBlagoUsersPageProps> = () => {
    const [buttonSelected, setButtonSelected] = useState<string>('')
    const [data, setData] = useState<any[]>()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{id?: number, userId?: number, adults?: number, teens?: number, pensioners?: number, disabled?: number, pregnant?: number, description?: string}>({});


    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    useEffect(() => {
        if (buttonSelected === 'Верифицированные') {
            setData(ver)
        } else if (buttonSelected === 'Неверефицированные') {
            setData(neVer)
        } else if (buttonSelected === 'Заявки') {
            setData(verTasks)
        }
    }, [buttonSelected])

    useEffect(() => {
        console.log('данные', data)
    }, [data])
    return (
        <MainLayout>
            <Box mt={'2'} ml={'4'} mr={'4'}  w='100%'>
                <Text as='h3' textStyle='h3'>Благополучатели</Text>
                
                <ButtonGroup mt='4'>
                    <Button 
                        borderWidth='1px' 
                        borderColor='#1e88e5' 
                        color='#1e88e5' 
                        bg='white'
                        onClick={() => setButtonSelected('Верифицированные')}
                    >
                        Верифицированные
                    </Button>

                    <Button 
                        borderWidth='1px' 
                        borderColor='#1e88e5' 
                        color='#1e88e5' 
                        bg='white'
                        onClick={() => setButtonSelected('Неверефицированные')}
                    >
                        Неверефицированные
                    </Button>

                    <Button 
                        borderWidth='1px' 
                        borderColor='#1e88e5' 
                        color='#1e88e5' 
                        bg='white'
                        onClick={() => setButtonSelected('Заявки')}
                    >
                        Заявки
                    </Button>
                </ButtonGroup>

                <VStack spacing={4}  w='100%' mt={4}>
                    {buttonSelected === 'Верифицированные' && (
                        <>
                            {data && data.map((item: any) => (
                                <HStack pt='2' pb='2' pl={4} pr={4} w='100%' display='flex' borderRadius='15px' alignItems='center' justifyContent='space-between' borderWidth='1px' borderColor='#1e88e5'>
                                    <Text textStyle='p'>{item.id}</Text>
                                    <Text textStyle='p'>{item.email}</Text>
                                    <Text textStyle='p'>{item.lastName} {item.firstName}</Text>
                                    <Text textStyle='p'>{item.tel}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                    
                    {buttonSelected === 'Неверефицированные' && (
                        <>
                            {data && data.map((item: any) => (
                                <HStack pt='2' pb='2' pl={4} pr={4} w='100%' display='flex' borderRadius='15px' alignItems='center' justifyContent='space-between' borderWidth='1px' borderColor='#1e88e5'>
                                    <Text textStyle='p'>{item.id}</Text>
                                    <Text textStyle='p'>{item.email}</Text>
                                    <Text textStyle='p'>{item.lastName} {item.firstName}</Text>
                                    <Text textStyle='p'>{item.tel}</Text>
                                </HStack>
                            ))}
                        </>
                    )}

                    {buttonSelected === 'Заявки' && (
                        <>
                            {data && data.map((item: any) => (
                                <HStack 
                                    pt='2' 
                                    pb='2' 
                                    pl={4} 
                                    pr={4} 
                                    w='100%' 
                                    display='flex' 
                                    borderRadius='15px' 
                                    alignItems='center' 
                                    justifyContent='space-between' 
                                    borderWidth='1px' 
                                    borderColor='#1e88e5' 
                                    onClick={() => handleItemClick(item)}
                                    cursor='pointer'
                                >
                                    <Text textStyle='p'>{item.id}</Text>
                                    <Text textStyle='p'>{item.userId}</Text>
                                    <Text textStyle='p'>{item.description}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                </VStack>
                {isPopupOpen && (
                    <Box position='fixed' top='50%' mt='-30vh' left='50%' ml='-25%' w='50%' h='60vh' bg='white' borderRadius='30px' borderWidth='1px' borderColor='GrayText'>
                        <IconButton
                            aria-label='Close popup'
                            icon={<CloseIcon />}
                            position='absolute'
                            top={2}
                            right={2}
                            onClick={() => setIsPopupOpen(false)}
                            bg='transparent'
                        />
                        <VStack pt={12} pl={8} spacing={2} alignItems='flex-start'>
                            <Text textStyle='p'>id заявки: {selectedItem?.id}</Text>
                            <Text textStyle='p'>id пользователя: {selectedItem?.userId}</Text>
                            <Text textStyle='p'>кол-во взрослых в семье: {selectedItem?.adults}</Text>
                            <Text textStyle='p'>кол-во инвалидов: {selectedItem?.disabled}</Text>
                            <Text textStyle='p'>кол-во пенсионеров: {selectedItem?.pensioners}</Text>
                            <Text textStyle='p'>кол-во беременных: {selectedItem?.pregnant}</Text>
                            <Text textStyle='p'>кол-во до 18: {selectedItem?.teens}</Text>
                            <Text textStyle='p'>описание ситуации: {selectedItem?.description}</Text>
                        </VStack>

                        <ButtonGroup 
                            position='absolute'
                            bottom={10}
                            left={8}
                        >
                            <Button bg='green.500' color='white'>Принять</Button>
                            <Button bg='tomato' color='white'>Отклонить</Button>
                        </ButtonGroup>
                    </Box>
                )}
            </Box>
        </MainLayout>
        
    )
}

export default BlagoUsersPage;
