/* eslint-disable @typescript-eslint/no-explicit-any */
import { getVolunteerVerificationAttempts } from "@/api/getTasks";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, HStack, IconButton, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { approveVolunteerVerificationAttempt, rejectVolunteerVerificationAttempt } from "@/api/volounteeTask";
import { getVolunteers } from "@/api/getUsers";
import { dateConvert } from "@/utils/dateConvert";

interface IVoulonteeUsersPageProps {

}

const VoulonteeUsersPage:FC<IVoulonteeUsersPageProps> = () => {
    const [buttonSelected, setButtonSelected] = useState<string>('')
    const [data, setData] = useState<any[]>()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{ 
        lastName?: string, 
        firstName?: string, 
        age?: number, 
        geo?: string,
        helpTypeMask?: string,
        description?: string,
        email?: string, 
        phone?: string,
        createdAt?: string,
        lastLoginAt?: string,
        lastUpdatedAt?: string,
    }>({});

    const [selectedBackItem, setSelectedBackItem] = useState<{
        id: number, 
        lastName?: string, 
        firstName?: string, 
        age?: number, 
        geo?: string,
        helpTypeMask?: number,
        description?: string,
        email: string, 
        phone?: string,
        status?: number,
    }>({id: 0, email: ''});
    const [commentTask, setCommentTask] = useState<string>('');
    const [openDeni, setOpenDeni] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    
    const token = Cookies.get('token')
    
    
    // принятие отклонение заявок
    const approveAttemtBack = async (id: number) => {
        const resp = await approveVolunteerVerificationAttempt(token, id)

        console.log('APPROVE',resp)
    }

    const rejectAttemtBack = async (email: string) => {
        const resp = await rejectVolunteerVerificationAttempt(token, email, commentTask)

        console.log('REGECT', resp)
    }

    // клик вызывающий попап
    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    const handleItemClickBack = (item: any) => {
        setSelectedBackItem(item);
        setIsPopupOpen(true);
    };


    const getVolunteerVerificationAttemptsFromBack = async () => {
        const resp = await getVolunteerVerificationAttempts(token)

        if (resp.status === 200) {
            console.log('Респонс волонтеров', resp.data)
            setData(resp.data)
        }  
    }

    const getVoulonteersFromBack = async () => {
        const resp = await getVolunteers(token)

        if (resp.status === 200) {
            console.log('ВОЛОНТЕРЫ',resp.data)
            setData(resp.data)
        }
        
    }


    const handleDeniTask = async (email: string) => {
        if (commentTask.length > 0 ) {
            setIsloading(true);

            await rejectAttemtBack(email)
            
            alert(`заявка отклонена, письмо отправлено на почту! почта: ${email}`)
            
            setIsloading(false);

            setIsPopupOpen(false);
        } else {
            alert('Вы незаполнили поле комментарий!')
        }
        
    }

    const acceptTask = async (id: number) => {
        setIsloading(true);

        await approveAttemtBack(id)

        alert(`заявка принята! id заявки: ${id}`)

        setIsloading(false);

        setIsPopupOpen(false);
    }


    useEffect(() => {
        if (buttonSelected === 'Волонтеры') {
            getVoulonteersFromBack()
        } else if (buttonSelected === 'Заявки') {
            // setData(verTasks)
            getVolunteerVerificationAttemptsFromBack()
        }
    }, [buttonSelected])


    useEffect(() => {
        if (!isPopupOpen) {
            setOpenDeni(false);
            setCommentTask('')
        }
    }, [isPopupOpen])

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
                                    <Text textStyle='p'>{item.email}</Text>
                                    <Text textStyle='p'>{item.lastName} {item.firstName}</Text>
                                    <Text textStyle='p'>{item.phone}</Text>
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
                                    onClick={() => handleItemClickBack(item)}
                                    cursor='pointer'
                                >
                                    <Text textStyle='p'>{item.id}</Text>
                                    <Text textStyle='p'>{item.lastName} {item.firstName}</Text>
                                    <Text textStyle='p'>{item.email}</Text>
                                    <Text textStyle='p'>{item.phone}</Text>
                                    <Text textStyle='p'>{item.status === 0 && 'Новая'}</Text>
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
                                <Text textStyle='p'>фамилия: {selectedItem?.lastName}</Text>
                                <Text textStyle='p'>имя: {selectedItem?.firstName}</Text>
                                <Text textStyle='p'>возраст: {selectedItem?.age}</Text>
                                <Text textStyle='p'>адрес проживания: {selectedItem?.geo}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>телефон: {selectedItem?.phone}</Text>
                                <Text textStyle='p'>вид помощи: {selectedItem?.helpTypeMask}</Text>
                                <Text textStyle='p'>описание опыта: {selectedItem?.description}</Text>
                                <Text textStyle='p'>дата создания: {selectedItem?.createdAt && dateConvert(selectedItem?.createdAt)}</Text>
                                <Text textStyle='p'>последний логин: {selectedItem?.lastLoginAt && dateConvert(selectedItem?.lastLoginAt)}</Text>
                                <Text textStyle='p'>последнее обновление: {selectedItem?.lastUpdatedAt && dateConvert(selectedItem?.lastUpdatedAt)}</Text>
                            </VStack> 
                        )}

                        {buttonSelected === 'Заявки' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='45vh' overflowY='auto'>
                                <Text textStyle='h5'>Заявка</Text>
                                
                                <Text textStyle='p'>id заявки: {selectedBackItem?.id}</Text>
                                <Text textStyle='p'>фамилия: {selectedBackItem?.lastName}</Text>
                                <Text textStyle='p'>имя: {selectedBackItem?.firstName}</Text>
                                <Text textStyle='p'>возраст: {selectedBackItem?.age}</Text>
                                <Text textStyle='p'>адрес проживания: {selectedBackItem?.geo}</Text>
                                <Text textStyle='p'>почта: {selectedBackItem?.email}</Text>
                                <Text textStyle='p'>телефон: {selectedBackItem?.phone}</Text>
                                <Text textStyle='p'>вид помощи: {selectedBackItem?.helpTypeMask}</Text>
                                <Text textStyle='p'>описание опыта: {selectedBackItem?.description}</Text>
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
                                                <Button bg='green.500' color='white' onClick={() => acceptTask(selectedBackItem?.id)}>Принять</Button>
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
                                                <Button bg='tomato' color='white' onClick={() => handleDeniTask(selectedBackItem.email)}>Отправить</Button>
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
