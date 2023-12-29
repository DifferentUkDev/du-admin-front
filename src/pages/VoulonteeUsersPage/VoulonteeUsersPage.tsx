/* eslint-disable @typescript-eslint/no-explicit-any */
import { getVolunteerVerificationAttempts } from "@/api/getTasks";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { ver, verTasks } from "@/utils/voulontee";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, HStack, IconButton, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface IVoulonteeUsersPageProps {

}

const VoulonteeUsersPage:FC<IVoulonteeUsersPageProps> = () => {
    const [buttonSelected, setButtonSelected] = useState<string>('')
    const [data, setData] = useState<any[]>()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{
        taskId?: number, 
        userId?: number,  
        lastName?: string, 
        firstName?: string, 
        age?: number, 
        geo?: string,
        typeOfHelp?: string,
        descriptionExperience?: string,
        email?: string, 
        tel?: string 
    }>({});
    const [commentTask, setCommentTask] = useState<string>('');
    const [openDeni, setOpenDeni] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    
    const token = Cookies.get('token')
    
    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    const handleDeniTask = async () => {
        if (commentTask.length > 0 ) {
            setIsloading(true);

            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            console.log('комментарий отправлен', commentTask)
            
            setIsloading(false);

            setIsPopupOpen(false);
        } else {
            alert('Вы незаполнили поле комментарий!')
        }
        
    }

    const getVolunteerVerificationAttemptsFromBack = async () => {
        const resp = await getVolunteerVerificationAttempts(token)

        if (resp.status === 200) {
            console.log('Респонс волонтеров', resp.data)
        }
        
    }

    const acceptTask = async () => {
        setIsloading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsloading(false);

        setIsPopupOpen(false);
    }

    useEffect(() => {
        if (buttonSelected === 'Волонтеры') {
            setData(ver)
        } else if (buttonSelected === 'Заявки') {
            setData(verTasks)
            getVolunteerVerificationAttemptsFromBack()
        }
    }, [buttonSelected])

    useEffect(() => {
        if (!isPopupOpen) {
            setOpenDeni(false);
            setCommentTask('')
        }
    }, [isPopupOpen])

    useEffect(() => {
        console.log('данные', data)
    }, [data])
    return (
        <MainLayout>
            <Box mt={'2'} ml={'4'} mr={'4'}  w='100%'>
                <Text as='h3' textStyle='h3'>Волонтеры</Text>
                
                <ButtonGroup mt='4'>
                    <Button 
                        borderWidth='1px' 
                        borderColor='#1e88e5' 
                        color='#1e88e5' 
                        bg='white'
                        onClick={() => setButtonSelected('Волонтеры')}
                        isActive={buttonSelected === 'Волонтеры'}
                        _active={{color: 'white', bg: '#1e88e5'}}
                    >
                        Волонтеры
                    </Button>

                    <Button 
                        borderWidth='1px' 
                        borderColor='#1e88e5' 
                        color='#1e88e5' 
                        bg='white'
                        onClick={() => setButtonSelected('Заявки')}
                        isActive={buttonSelected === 'Заявки'}
                        _active={{color: 'white', bg: '#1e88e5'}}
                    >
                        Заявки
                    </Button>
                </ButtonGroup>

                <VStack spacing={4}  w='100%' mt={4} maxH='72vh' overflowY='auto'>
                    {buttonSelected === 'Волонтеры' && (
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
                                    <Text textStyle='p'>{item.userId}</Text>
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
                                    <Text textStyle='p'>{item.taskId}</Text>
                                    <Text textStyle='p'>{item.lastName} {item.firstName}</Text>
                                    <Text textStyle='p'>{item.email}</Text>
                                    <Text textStyle='p'>{item.tel}</Text>
                                    <Text textStyle='p'>{item.tel}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                </VStack>

                {/* Попап */}
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

                        {buttonSelected === 'Волонтеры' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='55vh' overflowY='auto'>
                                <Text textStyle='p'>id пользователя: {selectedItem?.userId}</Text>
                                <Text textStyle='p'>фамилия: {selectedItem?.lastName}</Text>
                                <Text textStyle='p'>имя: {selectedItem?.firstName}</Text>
                                <Text textStyle='p'>возраст: {selectedItem?.age}</Text>
                                <Text textStyle='p'>адрес проживания: {selectedItem?.geo}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>телефон: {selectedItem?.tel}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>вид помощи: {selectedItem?.typeOfHelp}</Text>
                                <Text textStyle='p'>описание опыта: {selectedItem?.descriptionExperience}</Text>
                            </VStack> 
                        )}

                        {buttonSelected === 'Заявки' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='45vh' overflowY='auto'>
                                <Text textStyle='h5'>Заявка</Text>
                                
                                <Text textStyle='p'>id заявки: {selectedItem?.taskId}</Text>
                                <Text textStyle='p'>фамилия: {selectedItem?.lastName}</Text>
                                <Text textStyle='p'>имя: {selectedItem?.firstName}</Text>
                                <Text textStyle='p'>возраст: {selectedItem?.age}</Text>
                                <Text textStyle='p'>адрес проживания: {selectedItem?.geo}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>телефон: {selectedItem?.tel}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>вид помощи: {selectedItem?.typeOfHelp}</Text>
                                <Text textStyle='p'>описание опыта: {selectedItem?.descriptionExperience}</Text>
                            </VStack> 
                        )}

                        {/* Кнопки принять/отклонить, не отображаются если не заявка */}
                        {buttonSelected === 'Заявки' && (
                            <>
                                {isLoading ? (
                                    <Box
                                        position='absolute'
                                        bottom={10}
                                        left={8}
                                    >
                                        <Spinner />
                                    </Box>
                                ) : (
                                    <>
                                        {!openDeni ? (
                                            <ButtonGroup 
                                                position='absolute'
                                                bottom={10}
                                                left={8}
                                            >
                                                <Button bg='green.500' color='white' onClick={() => acceptTask()}>Принять</Button>
                                                <Button bg='tomato' color='white'  onClick={() => setOpenDeni(true)}>Отклонить</Button>
                                            </ButtonGroup>
                                        ) : (
                                            <HStack 
                                                position='absolute'
                                                bottom={10}
                                                left={8}
                                                maxW='80%'
                                                w='100%'
                                            >
                                                <Input placeholder="Введите комментарий" onChange={(e) => setCommentTask(e.target.value)} value={commentTask} />
                                                <Button bg='tomato' color='white' onClick={() => handleDeniTask()}>Отправить</Button>
                                                <IconButton
                                                    aria-label="Очистить"
                                                    icon={<CloseIcon />}
                                                    onClick={() => setOpenDeni(false)}
                                                />
                                            </HStack>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Box>
                )}
            </Box>
        </MainLayout>
        
    )
}

export default VoulonteeUsersPage;
