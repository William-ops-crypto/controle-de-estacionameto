import React from 'react'
import "./styles.css";
import {
    Flex,
    Center,
    Box,
    
    
  } from '@chakra-ui/react'
import  {  SocialIcon  }  from  'react-social-icons'

const Footer = () => {


    return(

        
       <Flex>     
       
      <Box bg='teal'   w={'100%'} h={'100%'}>
      <Center  margin={5} >

               <SocialIcon  className = "Icone"  href='https://www.linkedin.com/in/william-santos-da-silva/' target="_blank"  url="https://linkedin.com" />
             
               <SocialIcon className = "Icone"  href='https://github.com/William-ops-crypto' target="_blank"  url="https://github.com" />
              
               <SocialIcon className = "Icone"  href='https://api.whatsapp.com/send/?phone=5521995915256&text&type=phone_number&app_absent=0' target="_blank"  url="https://whatsapp.com" />
               

              
                
       </Center>
       </Box>
       
       </Flex>    
)




}


export default Footer;