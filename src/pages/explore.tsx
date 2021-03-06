import React, {  } from 'react'
import { Box, Stack } from '@chakra-ui/react'

// components
import BusinessList from '../components/explore/BusinessList'
import { ExploreMap } from '../components/explore/ExploreMap'
import { ExploreProvider } from '../context/exploreContext'
import { ExploreForm } from '../components/explore/ExploreForm'
import { useRouter } from 'next/router'

const Explore: React.FC<{}> = () => {
  const router = useRouter()
  console.log('Router', router);
  
  const params = router.query

  console.log('address', params);
  

  return (
    <ExploreProvider>
      <Stack isInline>
        <Box w='840px'>
          <ExploreForm />
          <BusinessList />
        </Box>
        <Box w='55%' display={{ base: 'none', md: 'block' }}>
          <ExploreMap />
        </Box>
      </Stack>
    </ExploreProvider>
  );
}

export default Explore;