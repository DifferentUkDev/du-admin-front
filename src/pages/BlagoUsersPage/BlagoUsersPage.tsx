/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBeneficiaries } from "@/api/getUsers";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { neVer, ver, verTasks } from "@/utils/blago";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, HStack, IconButton, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getBeneficiaryVerificationAttempts } from "@/api/getTasks";

interface IBlagoUsersPageProps {

}

const BlagoUsersPage:FC<IBlagoUsersPageProps> = () => {
    const [buttonSelected, setButtonSelected] = useState<string>('')
    const [data, setData] = useState<any[]>()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{
        age?: number,
        createdAt?: string,
        dateOfDeparture?: string,
        description?: string,
        email?: string,
        firstName?: string,
        geo?: string,
        geoFrom?: string,
        isVerified?: string,
        lastLoginAt?: string,
        lastName?: string,
        lastUpdatedAt?: string,
        maritalStatus?: number,
        numberOfAdults?: number,
        numberOfChildren?: number,
        numberOfDisabled?: number,
        numberOfOld?: number,
        numberOfPregnant?: number,
        phone?: string,
        socialStatus?: number,
        verifiedPic?: string,
    }>({});
    const [commentTask, setCommentTask] = useState<string>('');
    const [openDeni, setOpenDeni] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    
    const token = Cookies.get('token')
    
    const getBeneficiariesFromBack = async (data: boolean) => {
        console.log(token)
        const resp = await getBeneficiaries(data, token)
        
        console.log(resp)
        
        if (resp.status === 200) {
            console.log(resp.data)

            setData(resp.data)
        }
    }

    const getBeneficiaryVerificationAttemptsFromBack = async () => {
        const resp = await getBeneficiaryVerificationAttempts(token)
        
        console.log('РЕСПОНС',resp)
        
        if (resp.status === 200) {
            console.log('РЕСПОНС',resp.data)
            // setBlagoTaskFromBack(resp.data)

        }
    }

    // открытие попапа
    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    // отклонение заявки
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

    // принятие заявки
    const acceptTask = async () => {
        setIsloading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsloading(false);

        setIsPopupOpen(false);
    }

    // действие по нажатию на табы
    useEffect(() => {
        if (buttonSelected === 'Верифицированные') {
            setData(ver)
            getBeneficiariesFromBack(true)
        } else if (buttonSelected === 'Неверефицированные') {
            setData(neVer)
            getBeneficiariesFromBack(false)
        } else if (buttonSelected === 'Заявки') {
            setData(verTasks)
            getBeneficiaryVerificationAttemptsFromBack()
        }
    }, [buttonSelected])

    // проверка на открытость попапа и скрытие и отчистка полей внутри него
    useEffect(() => {
        if (!isPopupOpen) {
            setOpenDeni(false);
            setCommentTask('')
        }
    }, [isPopupOpen])

    // дебаг
    useEffect(() => {
        console.log('данные', data)
    }, [data])

    // useEffect(() => {
    //     console.log('Пришло с бека', stateForResp)
    // }, [stateForResp])
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
                        isActive={buttonSelected === 'Верифицированные'}
                        _active={{color: 'white', bg: '#1e88e5'}}
                    >
                        Верифицированные
                    </Button>

                    <Button 
                        borderWidth='1px' 
                        borderColor='#1e88e5' 
                        color='#1e88e5' 
                        bg='white'
                        onClick={() => setButtonSelected('Неверефицированные')}
                        isActive={buttonSelected === 'Неверефицированные'}
                        _active={{color: 'white', bg: '#1e88e5'}}
                    >
                        Неверефицированные
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
                    {buttonSelected === 'Верифицированные' && (
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
                                    <Text textStyle='p'>{item.isVerified ? 'Верифицирован' : 'Неверифицирован'}</Text>
                                </HStack>
                            ))}
                        </>
                    )}
                    
                    {buttonSelected === 'Неверефицированные' && (
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
                                    <Text textStyle='p'>{item.isVerified ? 'Верифицирован' : 'Неверифицирован'}</Text>
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
                                    <Text textStyle='p'>{item.lastName} {item.firstName}</Text>
                                    <Text textStyle='p'>{item.email}</Text>
                                    <Text textStyle='p'>{item.taskStatus}</Text>
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

                        {buttonSelected === 'Верифицированные' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='55vh' overflowY='auto'>
                                <Text textStyle='p'>фамилия: {selectedItem?.lastName}</Text>
                                <Text textStyle='p'>имя: {selectedItem?.firstName}</Text>
                                <Text textStyle='p'>возраст: {selectedItem?.age}</Text>
                                <Text textStyle='p'>семейный статус: {selectedItem?.maritalStatus}</Text>
                                <Text textStyle='p'>адрес проживания: {selectedItem?.geo}</Text>
                                <Text textStyle='p'>откуда приехал: {selectedItem?.geoFrom}</Text>
                                <Text textStyle='p'>дата переезда: {selectedItem?.dateOfDeparture}</Text>
                                <Text textStyle='p'>статус (в обществе): {selectedItem?.socialStatus}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>телефон: {selectedItem?.phone}</Text>
                                <Text textStyle='p'>кол-во взрослых в семье: {selectedItem?.numberOfAdults}</Text>
                                <Text textStyle='p'>кол-во инвалидов: {selectedItem?.numberOfDisabled}</Text>
                                <Text textStyle='p'>кол-во пенсионеров: {selectedItem?.numberOfOld}</Text>
                                <Text textStyle='p'>кол-во беременных: {selectedItem?.numberOfPregnant}</Text>
                                <Text textStyle='p'>кол-во до 18: {selectedItem?.numberOfChildren}</Text>
                                <Text textStyle='p'>описание ситуации: {selectedItem?.description}</Text>
                            </VStack> 
                        )}

                        {buttonSelected === 'Неверефицированные' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='55vh' overflowY='auto'>
                                <Text textStyle='p'>фамилия: {selectedItem?.lastName}</Text>
                                <Text textStyle='p'>имя: {selectedItem?.firstName}</Text>
                                <Text textStyle='p'>возраст: {selectedItem?.age}</Text>
                                <Text textStyle='p'>семейный статус: {selectedItem?.maritalStatus}</Text>
                                <Text textStyle='p'>адрес проживания: {selectedItem?.geo}</Text>
                                <Text textStyle='p'>откуда приехал: {selectedItem?.geoFrom}</Text>
                                <Text textStyle='p'>дата переезда: {selectedItem?.dateOfDeparture}</Text>
                                <Text textStyle='p'>статус (в обществе): {selectedItem?.socialStatus}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>телефон: {selectedItem?.phone}</Text>
                            </VStack> 
                        )}

                        {/* {buttonSelected === 'Заявки' && (
                            <VStack pt={12} pl={8} pr={8}  spacing={2} alignItems='flex-start' maxH='45vh' overflowY='auto'>
                                <Text textStyle='p'>id заявки: {selectedItem?.id}</Text>
                                <Text textStyle='p'>id пользователя: {selectedItem?.userId}</Text>
                                <Text textStyle='p'>фамилия: {selectedItem?.lastName}</Text>
                                <Text textStyle='p'>имя: {selectedItem?.firstName}</Text>
                                <Text textStyle='p'>возраст: {selectedItem?.age}</Text>
                                <Text textStyle='p'>семейный статус: {selectedItem?.family}</Text>
                                <Text textStyle='p'>адрес проживания: {selectedItem?.geo}</Text>
                                <Text textStyle='p'>откуда приехал: {selectedItem?.geoFrom}</Text>
                                <Text textStyle='p'>дата переезда: {selectedItem?.arrivalDate}</Text>
                                <Text textStyle='p'>статус (в обществе): {selectedItem?.status}</Text>
                                <Text textStyle='p'>почта: {selectedItem?.email}</Text>
                                <Text textStyle='p'>телефон: {selectedItem?.tel}</Text>
                                
                                <Text textStyle='h5'>Заявка</Text>

                                <Text textStyle='p'>кол-во взрослых в семье: {selectedItem?.adults}</Text>
                                <Text textStyle='p'>кол-во инвалидов: {selectedItem?.disabled}</Text>
                                <Text textStyle='p'>кол-во пенсионеров: {selectedItem?.pensioners}</Text>
                                <Text textStyle='p'>кол-во беременных: {selectedItem?.pregnant}</Text>
                                <Text textStyle='p'>кол-во до 18: {selectedItem?.teens}</Text>
                                <Text textStyle='p'>описание ситуации: {selectedItem?.description}</Text>
                            </VStack> 
                        )} */}

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
                        
                        {/* Текст со статусом заявки
                        {buttonSelected === 'Заявки' && (
                            <>
                                {!openDeni && (
                                    <Text 
                                        textStyle='p' 
                                        position='absolute'
                                        bottom={10}
                                        right={8}
                                    >
                                        Статус заявки: {selectedItem?.taskStatus}
                                    </Text>
                                )}
                            </>
                        )} */}
                    </Box>
                )}
            </Box>
        </MainLayout>
        
    )
}

export default BlagoUsersPage;
