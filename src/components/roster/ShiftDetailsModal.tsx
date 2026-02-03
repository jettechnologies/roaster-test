"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { Shift } from "@/data/rosterData";
import { Add } from "iconsax-reactjs";

export const ShiftDetailsModal = ({
  isOpen,
  onClose,
  shifts,
  dateLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  shifts: Shift[];
  dateLabel: string;
}) => {
  const groupedShifts = shifts.reduce(
    (acc, shift) => {
      const hour = shift.startTime.split(":")[0] + ":00";
      if (!acc[hour]) acc[hour] = [];
      acc[hour].push(shift);
      return acc;
    },
    {} as Record<string, Shift[]>,
  );

  const getStyles = (category: string) => {
    switch (category) {
      case "Surgery":
        return { bg: "#FFF5EB", border: "#F28C33", color: "#F28C33" };
      case "Pijnspecialist":
        return { bg: "#F1FDF5", border: "#4CAF50", color: "#4CAF50" };
      case "Consultation":
        return { bg: "#FCFBEA", border: "#C0B12F", color: "#C0B12F" };
      default:
        return { bg: "#F5F6FF", border: "#3F51B5", color: "#283593" };
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" maxW="360px">
        <ModalHeader
          borderBottom="1px solid"
          borderColor="gray.100"
          fontSize="18px"
          fontWeight="800"
          color="gray.800"
          py={4}
        >
          {dateLabel}
        </ModalHeader>
        <ModalCloseButton top={4} />
        <ModalBody py={6} px={4}>
          <Box
            maxH="370px"
            overflowY="scroll"
            pr={2}
            sx={{
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": {
                bg: "gray.200",
                borderRadius: "full",
              },
            }}
          >
            <VStack align="start" spacing={6} w="full">
              {Object.entries(groupedShifts)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([hour, hourShifts]) => (
                  <VStack key={hour} align="start" spacing={4} w="full">
                    <Text fontSize="16px" fontWeight="800" color="gray.800">
                      {hour}
                    </Text>
                    <VStack spacing={3} w="full">
                      {hourShifts.map((shift) => {
                        const getStyles = (category: string) => {
                          switch (category.toLowerCase()) {
                            case "surgery":
                              return {
                                bg: "#FFF5EB",
                                border: "#F28C33",
                                color: "#F28C33",
                              };
                            case "pijnspecialist":
                              return {
                                bg: "#F1FDF5",
                                border: "#4CAF50",
                                color: "#4CAF50",
                              };
                            case "consultation":
                              return {
                                bg: "#FCFBEA",
                                border: "#C0B12F",
                                color: "#C0B12F",
                              };
                            default:
                              return {
                                bg: "#F5F6FF",
                                border: "#3F51B5",
                                color: "#283593",
                              };
                          }
                        };
                        const styles = getStyles(shift.category);
                        const userName =
                          shift.user?.name || shift.userName || "Unknown";
                        const userInitials = userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("");

                        return (
                          <Box
                            key={shift.id}
                            w="full"
                            bg={styles.bg}
                            p={3}
                            borderRadius="xl"
                            border="1px solid"
                            borderColor={styles.border}
                          >
                            <HStack spacing={3}>
                              <Box
                                w="32px"
                                h="32px"
                                bg="white"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                border="1px solid"
                                borderColor="gray.100"
                              >
                                <Text
                                  fontSize="10px"
                                  fontWeight="800"
                                  color="gray.400"
                                >
                                  {userInitials}
                                </Text>
                              </Box>
                              <VStack align="start" spacing={0} flex={1}>
                                <HStack spacing={2}>
                                  <Text
                                    fontSize="14px"
                                    fontWeight="800"
                                    color="gray.800"
                                  >
                                    {shift.title}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight="600"
                                    color="gray.500"
                                  >
                                    {shift.startTime} - {shift.endTime}
                                  </Text>
                                </HStack>
                                <Text
                                  fontSize="12px"
                                  fontWeight="700"
                                  color={styles.color}
                                >
                                  {userName}
                                </Text>
                              </VStack>
                            </HStack>
                          </Box>
                        );
                      })}
                    </VStack>
                  </VStack>
                ))}
              {/* Add Task Button */}
              <Button
                w="full"
                variant="outline"
                colorScheme="blue"
                leftIcon={<Add size={18} />}
                fontSize="14px"
                fontWeight="700"
                h="44px"
                borderRadius="xl"
                onClick={() => {
                  // Logic to add a task for this day
                  // For now, we'll just close and let the user click the grid or we could trigger a callback
                }}
              >
                Nieuw Taak
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
