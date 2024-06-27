import React from 'react'

import {
    Flex,
    Text,
    Center,
    Image
    
    
  } from '@chakra-ui/react';
  import { Link } from '@chakra-ui/react';
 


const Header = () => {


    return(
        <Flex bg='teal' w={'100%'} >
       
        <Center  margin={5}   p={10} borderRadius={30} fontStyle={'oblique'} fontSize={20} color="Black" >
                 
                     <Image
                     
                     marginLeft={10}
                     marginRight={10}
                         borderRadius={100}
                          boxSize='50px'
                         
                          src='https://scontent.fcaw5-1.fna.fbcdn.net/v/t1.6435-9/118386212_3457993920913484_454249750073191862_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGcVkN6MWHaNGc9Lw-egj3vqKTkh038B8GopOSHTfwHwVqz6wDg--i7G12WT5U5_m5SRs-eNHW2GyyzxdobSoZM&_nc_ohc=-LYOAq7Bsd0Q7kNvgE7P3AQ&_nc_ht=scontent.fcaw5-1.fna&oh=00_AYDdi8ifCvRyszKQPWJMp67NEa_DqwABbAkd4pN6HPCSng&oe=66A40F7B'
                          alt='Foto will'
                            />   
      
        <Text fontSize='2xl'>William Santos</Text>

        </Center>
        
        </Flex>


    )




}


export default Header;