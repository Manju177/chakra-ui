import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpwd, setConfirmpwd] = useState();
    const [show, setShow] = useState(false)
    const [confirmshow, setconfirmShow] = useState(false)

    const showFunction = () => {
        setShow(!show)
    }
    const uploadImage = (pics) => {

    }
    const handleSubmit=()=>{

    }
    const confirmshowFunction = () => {
        setconfirmShow(!confirmshow)
    }
    return (
        <VStack spacing="5px">
            <FormControl id="firstName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type='text'
                    placeholder='Enter Your Good Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type='text'
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" p="2px" onClick={showFunction} colorScheme='#00000085' border="none" >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="confirmpassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={confirmshow ? "text" : "password"}
                        placeholder='Confirm Your Password'
                        onChange={(e) => setConfirmpwd(e.target.value)}
                    />
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" p="2px" onClick={confirmshowFunction} colorScheme='#00000085' border="none" >
                            {confirmshow ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="firstName" isRequired>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type='file'
                    placeholder='Enter Your Good Name'
                    accept='image/'
                    onChange={(e) => uploadImage(e.target.files[0])}
                />
            </FormControl>
            <br/>
            <Button colorScheme='whatsapp' variant='solid' onClick={handleSubmit} width="100%">
                Sign Up
            </Button>

        </VStack>
    )
}

export default Signup