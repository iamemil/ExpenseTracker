import { React } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    Center,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
export default function Navbar() {
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>Expense Tracker</Box>

                    <Flex alignItems={'center'}>
                        <ColorModeSwitcher mr='2' justifySelf="flex-end" />
                        <Button mr='2' colorScheme='teal' size='md'>
                            Sign Up
                        </Button>
                        <Button mr='2' colorScheme='teal' variant='outline'>
                            Login
                        </Button>
                        <Stack direction={'row'} spacing={7}>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Your Servers</MenuItem>
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}