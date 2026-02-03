"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Collapse,
  useDisclosure,
  Flex,
  Image,
} from "@chakra-ui/react";
import {
  Category,
  Calendar,
  Setting2,
  DocumentText,
  Folder2,
  MessageQuestion,
  Book,
  Notification,
  ArrowDown2,
  ArrowUp2,
  RowHorizontal,
} from "iconsax-reactjs";
import { useState } from "react";
import Link from "next/link";

const MenuItem = ({
  icon,
  label,
  isActive,
  onClick,
  hasSubItems,
  isOpen,
}: {
  icon: any;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  hasSubItems?: boolean;
  isOpen?: boolean;
}) => (
  <HStack
    px={4}
    py={2.5}
    spacing={3}
    cursor="pointer"
    bg={isActive ? "blue.50" : "transparent"}
    color={isActive ? "blue.600" : "gray.600"}
    _hover={{ bg: "gray.50" }}
    borderLeft={isActive ? "4px solid" : "4px solid transparent"}
    borderColor={isActive ? "blue.600" : "transparent"}
    onClick={onClick}
    w="full"
  >
    <Icon as={icon} variant={isActive ? "Bold" : "Outline"} size={18} />
    <Text fontSize="14px" fontWeight={isActive ? "600" : "400"} flex={1}>
      {label}
    </Text>
    {hasSubItems && <Icon as={isOpen ? ArrowUp2 : ArrowDown2} size={14} />}
  </HStack>
);

export const RosterSidebar = () => {
  const { isOpen: isRoosterOpen, onToggle: onRoosterToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  const [activeItem, setActiveItem] = useState("Planner");

  return (
    <Box
      w="260px"
      bg="white"
      h="100vh"
      borderRight="1px solid"
      borderColor="gray.100"
      position="fixed"
      left={0}
      top={0}
      overflowY="auto"
      zIndex={10}
    >
      <VStack spacing={6} align="start" pt={6} w="full">
        <HStack w="full" px={4} justify="space-between">
          <HStack spacing={2}>
            <Box
              w="32px"
              h="32px"
              bg="blue.50"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Category} color="blue.600" size={18} variant="Bold" />
            </Box>
            <VStack align="start" spacing={0}>
              <Text
                fontWeight="800"
                fontSize="13px"
                color="blue.600"
                lineHeight="1"
              >
                excellent care
              </Text>
              <Text fontSize="11px" color="blue.400" fontWeight="500">
                clinics
              </Text>
            </VStack>
          </HStack>
          <Box p={2} borderRadius="md" bg="gray.50" cursor="pointer">
            <Icon as={RowHorizontal} size={16} color="gray.600" />
          </Box>
        </HStack>

        <VStack spacing={0} w="full" align="start">
          <MenuItem icon={Category} label="Startpagina" />

          <MenuItem
            icon={Calendar}
            label="Rooster"
            hasSubItems
            isOpen={isRoosterOpen}
            onClick={onRoosterToggle}
          />
          <Collapse in={isRoosterOpen} style={{ width: "100%" }}>
            <VStack spacing={0} w="full" align="start" pl={6}>
              <MenuItem
                icon={Calendar}
                label="Mijn Rooster"
                isActive={activeItem === "Mijn Rooster"}
                onClick={() => setActiveItem("Mijn Rooster")}
              />
              <MenuItem
                icon={Calendar}
                label="Planner"
                isActive={activeItem === "Planner"}
                onClick={() => setActiveItem("Planner")}
              />
            </VStack>
          </Collapse>

          <MenuItem icon={Setting2} label="Instellingen" />
          <MenuItem icon={DocumentText} label="My to-do Protocols" />
          <MenuItem icon={Folder2} label="Document Management" />
          <MenuItem icon={MessageQuestion} label="Department News" />
          <MenuItem icon={Book} label="Knowledge Base" />
          <MenuItem icon={Notification} label="General News" />
        </VStack>
      </VStack>
    </Box>
  );
};
