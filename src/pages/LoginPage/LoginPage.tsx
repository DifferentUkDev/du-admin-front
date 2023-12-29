import { 
    Box, 
    Text, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    VStack,
    InputGroup,
    InputRightElement,
    IconButton,
    Spinner,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "@/api/auth";
import Cookies from 'js-cookie';

interface ILoginPageProps {

}

interface IFormInput {
    email: string;
    password: string;
  }

const LoginPage:FC<ILoginPageProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (values) => {
        setIsLoading(true); // Включаем индикатор загрузки
    
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await loginUser(values.email, values.password)
        
        console.log('resp', response)

        if (response.status === 200) {
            console.log('resp', response.data)

            Cookies.remove('email');
            Cookies.remove('userRole');
            Cookies.remove('userType');
            Cookies.remove('token');

            Cookies.set('email', values.email, {expires: 5});
            Cookies.set('userRole', response.data.userRole, {expires: 5});
            Cookies.set('userType', response.data.userType, {expires: 5});
            Cookies.set('token', response.data.token, {expires: 5});

            navigate('/home');
        }

       
        
        setIsLoading(false); // Выключаем индикатор загрузки после завершения асинхронной операции
      };

    useEffect(() => {
        if (isLoading) console.log('isLoading', isLoading);
        else console.log('isLoading', isLoading);
    }, [isLoading])

    return (
        <Box display='flex' w='100%' flexDirection='column' alignItems='center'>
            <Box h='50px' bg='white' borderWidth='1px' w='100%' display='flex' justifyContent='center' alignItems='center'>
                <Text as='h3' textStyle='h4' color='primary.600'>Admin du</Text>
            </Box>

            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} maxW='300px' mt='200px'>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                    id="email"
                    type="text"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                        },
                    })}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <InputGroup>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 4,
                                message: 'Password must be at least 6 characters',
                            },
                            })}
                        />

                        <InputRightElement>
                            <IconButton
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={togglePasswordVisibility}
                            variant="unstyled"
                            size="sm"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                </FormControl>

                <Button
                    mt={4}
                    colorScheme="primary.600"
                    color='primary.600'
                    borderWidth='1px'
                    borderColor='#1e88e5'
                    isLoading={isLoading} // Используем состояние isLoading для блокировки кнопки на время загрузки
                    type="submit"
                >
                    {!isLoading ? 'Войти' : <Spinner />}
                </Button>
            </VStack>
        </Box>
    )
}

export default LoginPage;
