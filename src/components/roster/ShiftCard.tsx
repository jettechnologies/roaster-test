"use client";

import { Box, Text, VStack, HStack, Avatar, Icon } from "@chakra-ui/react";
import { Shift } from "@/data/rosterData";
import { InfoCircle } from "iconsax-reactjs";
export const ShiftCard = ({
  shift,
  onClick,
}: {
  shift: Shift;
  onClick: () => void;
}) => {
  const getStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "surgery":
        return { bg: "#FFF5EB", border: "#F28C33", color: "#F28C33" };
      case "pijnspecialist":
        return { bg: "#F1FDF5", border: "#4CAF50", color: "#4CAF50" };
      case "consultation":
        return { bg: "#FCFBEA", border: "#C0B12F", color: "#C0B12F" };
      default:
        return { bg: "#F5F6FF", border: "#3F51B5", color: "#283593" };
    }
  };

  const styles = getStyles(shift.category);
  const userName = shift.user?.name || shift.userName || "Unknown";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Box
      bg={styles.bg}
      p={3}
      borderRadius="xl"
      border="1px solid"
      borderColor={styles.border}
      cursor="pointer"
      onClick={onClick}
      h="full"
      w="full"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-1px)", boxShadow: "xs" }}
      position="relative"
    >
      <VStack align="start" spacing={2} h="full">
        <HStack w="full" spacing={2}>
          <Box
            bg="white"
            borderRadius="md"
            px={1.5}
            py={0.5}
            border="1px solid"
            borderColor="gray.100"
          >
            <Text fontSize="10px" fontWeight="800" color="gray.400">
              {userInitials}
            </Text>
          </Box>
        </HStack>

        <VStack align="start" spacing={0} flex={1}>
          <Text
            fontSize="13px"
            fontWeight="800"
            color="gray.800"
            lineHeight="1.2"
          >
            {shift.title}
          </Text>
          <Text fontSize="10px" color="gray.500" fontWeight="600" mt={1}>
            {shift.startTime} - {shift.endTime}
          </Text>
        </VStack>

        <Text fontSize="10px" fontWeight="700" color={styles.color}>
          {userName}
        </Text>
      </VStack>
    </Box>
  );
};
