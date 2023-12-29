/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import {
  Flex,
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import { HamburgerIcon, BellIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

interface IHeaderProps {
    onToggle: any;
    isOpen: any;
}

const Header:FC<IHeaderProps> = ({onToggle, isOpen}) => {
    const [userStatus, setUserStatus] = useState('онлайн');
    
    console.log(isOpen)

    const userEmail = Cookies.get('email')
    const userRole = Cookies.get('userRole')

    return (
        <Flex justify="space-between" align="center" p="4" bg="headerBgColor" color="headerTextColor">
            <Box>
                <IconButton
                icon={<HamburgerIcon />}
                onClick={() => onToggle(!isOpen)}
                variant="outline"
                aria-label="Toggle sidebar"
                />
                <NavLink to='/home'>
                    <Text ml="4" textStyle='h5' color='primary.600' display="inline-block" as='h5' cursor='pointer'>
                    admin du
                    </Text>
                </NavLink>
            </Box>
            <Flex align="center">
                <Popover>
                <PopoverTrigger>
                    <IconButton icon={<BellIcon />} variant="outline" aria-label="Notifications" />
                </PopoverTrigger>
                <PopoverContent p="4">
                    <Text>Нет уведомлений</Text>
                </PopoverContent>
                </Popover>

                <Box ml='4'>
                    <Popover trigger="click" closeOnBlur={false}>
                        <PopoverTrigger>
                            <Avatar size='md' cursor='pointer' name='Имя Пользователя'>
                                <AvatarBadge boxSize='1em' bg={userStatus === 'онлайн' ? 'green.500' : 'tomato'} />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent p="4">
                            <Text>Email: {userEmail}</Text>
                            <Text>Роль: {userRole === '5' ? 'Админ' : 'какой-то чел'}</Text>
                            <Text>Статус:
                                <select
                                    value={userStatus}
                                    onChange={(e) => setUserStatus(e.target.value)}
                                    style={{ marginLeft: '8px' }}
                                >
                                    <option value="онлайн">онлайн</option>
                                    <option value="отошел">отошел</option>
                                </select>
                            </Text>
                        </PopoverContent>
                    </Popover>
                </Box>
            </Flex>
        </Flex>
  );
}

export default Header;
