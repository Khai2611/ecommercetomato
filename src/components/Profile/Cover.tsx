import { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import {assets} from '../../assets/frontend_assets/assets'

export default function Cover() {
  const [coverImage] = useState<string | null>(null);

  return (
    <Box w="100vw" h="15vw" overflow="hidden" position="relative" left="50%" right="50%" ml="-50vw" mr="-50vw">
      <Image
        objectFit="cover"
        src={coverImage ? coverImage : assets.autumn}
        alt="Cover Image"
      />
    </Box>
  );
}
