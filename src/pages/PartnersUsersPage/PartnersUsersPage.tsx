/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, HStack, IconButton, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { approvePartnerVerificationAttempt, rejectPartnerVerificationAttempt } from "@/api/partnerTask";
import { getPartnerVerificationAttempts } from "@/api/getTasks";
import { getPartners } from "@/api/getUsers";

interface IPartnersUsersPageProps {

}

const PartnersUsersPage:FC<IPartnersUsersPageProps> = () => {
    const [buttonSelected, setButtonSelected] = useState<string>('')
    const [data, setData] = useState<any[]>()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{
        id: number, 
        fullName?: string, 
        legalType?: string,
        registrationDate?: string,
        registrationCity?: string,
        inn?: string,
        kpp?: string,
        ogrn?: string,
        webSite?: string,
        reportLink?: string,
        description?: string,
        contactFullName?: string,
        contactPhone?: string,
        contactEmail: string,
        helpTypeMask?: number,
        comment?: string,
        status?: number,
    }>({id: 0, contactEmail: ''});
    const [commentTask, setCommentTask] = useState<string>('');
    const [openDeni, setOpenDeni] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    
    const token = Cookies.get('token')
    
    // принятие отклонение заявок
    const approveAttemtBack = async (id: number) => {
        const resp = await approvePartnerVerificationAttempt(token, id)

        console.log('APPROVE',resp)
    }

    const rejectAttemtBack = async (email: string) => {
        const resp = await rejectPartnerVerificationAttempt(token, email, commentTask)

        console.log('REGECT', resp)
    }

    const getPartnerVerificationAttemptsFromBack = async () => {
        const resp = await getPartnerVerificationAttempts(token)

        if (resp.status === 200) {
            console.log('Респонс волонтеров', resp.data)
            setData(resp.data)
        }  
    }

    const getPartnersFromBack = async () => {
        const resp = await getPartners(token)

        if (resp.status === 200) {
            console.log('ВОЛОНТЕРЫ',resp.data)
            setData(resp.data)
        }
        
    }

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    const handleDeniTask = async (email:string) => {
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

        alert(`заявка принята, но осталась в списке, потому что бек так решил! id заявки: ${id}`)

        setIsloading(false);

        setIsPopupOpen(false);
    }

    useEffect(() => {
        if (buttonSelected === 'Партнеры') {
            getPartnersFromBack()
        } else if (buttonSelected === 'Заявки') {
            getPartnerVerificationAttemptsFromBack()
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
            <Box mt={'2'} ml={'4'} mr={'4'}  w='100%' >
                <Text as='h3' textStyle='h3'>Партнеры</Text>
                
                <ButtonGroup mt='4'>
                    <Button 
                        borderWidth='1px' 
                        borderColor='#1e88e5' 
                        color='#1e88e5' 
                        bg='white'
                        onClick={() => setButtonSelected('Партнеры')}
                        isActive={buttonSelected === 'Партнеры'}
                        _active={{color: 'white', bg: '#1e88e5'}}
                    >
                        Партнеры
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
                    {buttonSelected === 'Партнеры' && (
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
                                    <Text textStyle='p'>{item.legalType} {item.fullName}</Text>
                                    <Text textStyle='p'>{item.contactEmail}</Text>
                                    <Text textStyle='p'>{item.contactPhone}</Text>
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
                                    <Text textStyle='p'>{item.legalType} {item.fullName}</Text>
                                    <Text textStyle='p'>{item.contactEmail}</Text>
                                    <Text textStyle='p'>{item.contactPhone}</Text>
                                    <Text textStyle='p'>{item.status === 0 ? 'новая' : 'в работе'}</Text>
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

                        {buttonSelected === 'Партнеры' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='55vh' overflowY='auto'>
                                <Text textStyle='p'>id пользователя: {selectedItem?.id}</Text>
                                <Text textStyle='p'>Наименование: {selectedItem?.fullName}</Text>
                                <Text textStyle='p'>Правовая форма: {selectedItem?.legalType}</Text>
                                <Text textStyle='p'>Дата регистрации: {selectedItem?.registrationDate}</Text>
                                <Text textStyle='p'>Город регистрации: {selectedItem?.registrationCity}</Text>
                                <Text textStyle='p'>ИНН: {selectedItem?.inn}</Text>
                                <Text textStyle='p'>КПП: {selectedItem?.kpp}</Text>
                                <Text textStyle='p'>ОРГН: {selectedItem?.ogrn}</Text>
                                <Text textStyle='p'>Веб-сайт: {selectedItem?.webSite}</Text>
                                <Text textStyle='p'>Отчет в мин.юсе.: {selectedItem?.reportLink}</Text>
                                <Text textStyle='p'>Описание работы: {selectedItem?.description}</Text>
                                <Text textStyle='p'>Имя контактного лица: {selectedItem?.contactFullName}</Text>
                                <Text textStyle='p'>Телефон к.л.: {selectedItem?.contactPhone}</Text>
                                <Text textStyle='p'>Почта к.л.: {selectedItem?.contactEmail}</Text>
                                <Text textStyle='p'>Маска типов помощи: {selectedItem?.helpTypeMask}</Text>
                            </VStack> 
                        )}

                        {buttonSelected === 'Заявки' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='45vh' overflowY='auto'>
                                <Text textStyle='h5'>Заявка</Text>
                                
                                <Text textStyle='p'>id пользователя: {selectedItem?.id}</Text>
                                <Text textStyle='p'>Наименование: {selectedItem?.fullName}</Text>
                                <Text textStyle='p'>Правовая форма: {selectedItem?.legalType}</Text>
                                <Text textStyle='p'>Дата регистрации: {selectedItem?.registrationDate}</Text>
                                <Text textStyle='p'>Город регистрации: {selectedItem?.registrationCity}</Text>
                                <Text textStyle='p'>ИНН: {selectedItem?.inn}</Text>
                                <Text textStyle='p'>КПП: {selectedItem?.kpp}</Text>
                                <Text textStyle='p'>ОРГН: {selectedItem?.ogrn}</Text>
                                <Text textStyle='p'>Веб-сайт: {selectedItem?.webSite}</Text>
                                <Text textStyle='p'>Отчет в мин.юсе.: {selectedItem?.reportLink}</Text>
                                <Text textStyle='p'>Описание работы: {selectedItem?.description}</Text>
                                <Text textStyle='p'>Имя контактного лица: {selectedItem?.contactFullName}</Text>
                                <Text textStyle='p'>Телефон к.л.: {selectedItem?.contactPhone}</Text>
                                <Text textStyle='p'>Почта к.л.: {selectedItem?.contactEmail}</Text>
                                <Text textStyle='p'>Маска типов помощи: {selectedItem?.helpTypeMask}</Text>
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
                                                <Button bg='green.500' color='white' onClick={() => acceptTask(selectedItem.id)}>Принять</Button>
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
                                                <Button bg='tomato' color='white' onClick={() => handleDeniTask(selectedItem.contactEmail)}>Отправить</Button>
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

                        {/* Текст со статусом заявки */}
                        {buttonSelected === 'Заявки' && (
                            <>
                                {!openDeni && (
                                    <Text 
                                        textStyle='p' 
                                        position='absolute'
                                        bottom={10}
                                        right={8}
                                    >
                                        Статус заявки: {selectedItem?.status === 0 ? 'новая' : 'в работе'}
                                    </Text>
                                )}
                            </>
                        )}
                    </Box>
                )}
            </Box>
        </MainLayout>
        
    )
}

export default PartnersUsersPage;
