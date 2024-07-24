import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, Heading, Text, Image, CardBody } from '@chakra-ui/react';

const DetailsCard = ({ image, title, subTitle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const sanitizedTitle = title.toLowerCase().replace(/ /g, '-');
    navigate(`/${sanitizedTitle}`);
  }

  return (
    <Card maxW='sm' size='sm'>
      <CardBody>
        <Image
          src={image}
          alt='Green double couch with wooden legs'
          width={600}
          height={200}
          sizes='md'
          borderRadius='lg'
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
        />
        <Stack mt='6' spacing='1' align='center'>
          <Heading size='md'>{title}</Heading>
          <Text color='black' fontSize='sm' >
            {subTitle}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default DetailsCard