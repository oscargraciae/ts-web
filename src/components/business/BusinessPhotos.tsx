import { Box, Flex, Heading, Image, SimpleGrid, Wrap } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext';
import { BusinessService } from '../../services/businessService';
import { BusinessServices } from './BusinessServices';

interface BusinessPhotosProps {
  businessId: number
}

export const BusinessPhotos: React.FC<BusinessPhotosProps> = ({ businessId }) => {
  const [photos, setPhotos] = useState<object[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetch = async () => {
      const response = await new BusinessService().getPhotos(businessId)
      console.log('Respuestas', response);
      if (response.success) {
        console.log('response.photos', response.photos);
        
        setPhotos(response.photos);
      }
      
    }
    fetch();
  }, []);

  return (
    <Flex direction='column' flex={1}>
      <Heading as="h3" size="lg" mb={3}>Fotos</Heading>
      <SimpleGrid columns={3} mt={4}>
        { photos.slice(0, 6).map((photo :any, index :number) => (
          <Box p={2} key={index} role='group'>
            <Image w='200px' h='133px' objectFit="cover" src={photo.file} />
          </Box>
        )) }
      </SimpleGrid>
    </Flex>
  );
}