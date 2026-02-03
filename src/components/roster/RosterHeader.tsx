"use client";

import {
  Box,
  HStack,
  Text,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import {
  SearchNormal1,
  Notification,
  Element3,
  DirectInbox,
  Setting2,
  ArrowDown2,
} from "iconsax-reactjs";

export const RosterHeader = () => {
  return (
    <Box
      h="64px"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      px={8}
      position="sticky"
      top={0}
      zIndex={5}
    >
      <HStack h="full" justify="space-between">
        <HStack spacing={4} flex={1}></HStack>

        <HStack spacing={8}>
          <HStack spacing={6}>
            <Box position="relative">
              <Icon
                as={Element3}
                size={22}
                color="blue.500"
                cursor="pointer"
                variant="Bold"
              />
            </Box>
            <Icon as={Setting2} size={22} color="gray.600" cursor="pointer" />
            <Box position="relative">
              <Icon
                as={Notification}
                size={22}
                color="gray.600"
                cursor="pointer"
              />
              <Box
                position="absolute"
                top="0"
                right="0"
                w="8px"
                h="8px"
                bg="red.500"
                borderRadius="full"
                border="2px solid white"
              />
            </Box>
          </HStack>

          <HStack spacing={3} cursor="pointer">
            <VStack align="end" spacing={0}>
              <Text fontSize="13px" fontWeight="700" color="gray.800">
                Paul Cornelius
              </Text>
              <Text fontSize="11px" color="gray.500" fontWeight="500">
                Paul@dstrct.com
              </Text>
            </VStack>
            <Avatar
              size="sm"
              name="Paul Cornelius"
              src="/avatar.png"
              border="1px solid"
              borderColor="gray.100"
            />
            <Icon as={ArrowDown2} size={14} color="gray.500" />
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
};
