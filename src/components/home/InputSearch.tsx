import React, { useState } from 'react'
import { Button, Input, Stack, Box, Progress, Text } from '@chakra-ui/react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

interface InputSearchProps {

}

export const InputSearch: React.FC<InputSearchProps> = ({}) => {
  // states
  const [geoAddress, setGeoAddress] = useState<string>('');

  // const { changeLocation } = useGoogleMaps({ coords, setCoords });

  const handleSelect = async (address: string) => {
    const results = await geocodeByAddress(address)
    const latLng = await getLatLng(results[0]);
    
    setGeoAddress(address);
  }

  return (
    <Stack mt={0} isInline bg='#FFF' px={2} py={2} boxShadow='0px 5px 10px rgba(0,0,0,.08)' borderRadius={6}>
      {/* <Input placeholder="Ubicación" size="lg" border='0px' fontWeight='600' /> */}
      <PlacesAutocomplete
          value={geoAddress}
          onChange={(geoaddress) => setGeoAddress(geoaddress)}
          onSelect={handleSelect}
          searchOptions={{ componentRestrictions: { country: ['mx'] } }}
        >
          { (({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <Box w="100%">
                {/* <Input {...getInputProps()} placeholder='Dirección ' size='lg' variant="flushed" my={4} fontSize='xl' borderBottomColor='#DDD' fontWeight='semibold' pt='9px' /> */}
                <Input {...getInputProps()} placeholder="Ubicación" size="lg" border='0px' fontWeight='600' /> 
                <Box shadow='md' background='#FFFFFF' zIndex={10} pos="absolute" >
                  { loading && <Progress size="xs" isIndeterminate colorScheme='green' /> }
                  {suggestions.map(suggestion => {
                    return (
                      <Box {...getSuggestionItemProps(suggestion, { key: suggestion.id })} textAlign='left' px={6} py={4}>
                        <Text>{suggestion.description}</Text>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
          )) }
        </PlacesAutocomplete>
      <Button variant='primary' size="lg">
        Buscar
      </Button>
    </Stack>
  );
}