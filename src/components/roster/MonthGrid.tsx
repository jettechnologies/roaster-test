"use client";

import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { Shift } from "@/data/rosterData";

interface MonthGridProps {
  currentDate: Date;
  shifts: Shift[];
  onShiftClick: (shift: Shift) => void;
  onDayClick: (date: Date) => void;
}

export const MonthGrid = ({
  currentDate,
  shifts,
  onShiftClick,
  onDayClick,
}: MonthGridProps) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const getShiftsForDay = (date: Date) => {
    // In a real app, shifts would have a 'date' property.
    // For this mock, we'll just show some shifts on the 1st, 8th, etc. to demonstrate.
    const day = date.getDate();
    return shifts.filter((s) => day === 1 || day === 8 || day === 15);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "surgery":
        return "#F28C33";
      case "pijnspecialist":
        return "#4CAF50";
      case "consultation":
        return "#C0B12F";
      default:
        return "#3F51B5";
    }
  };

  return (
    <Box h="full" bg="white">
      <Grid
        templateColumns="repeat(7, 1fr)"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        {["MA", "DI", "WO", "DO", "VR", "ZA", "ZO"].map((day) => (
          <GridItem key={day} py={3} textAlign="center">
            <Text fontSize="12px" fontWeight="800" color="gray.500">
              {day}
            </Text>
          </GridItem>
        ))}
      </Grid>
      <Grid templateColumns="repeat(7, 1fr)" autoRows="minmax(120px, auto)">
        {calendarDays.map((day, idx) => {
          const dayShifts = getShiftsForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <GridItem
              key={day.toISOString()}
              borderRight="1px solid"
              borderBottom="1px solid"
              borderColor="gray.100"
              p={2}
              bg={!isCurrentMonth ? "gray.50" : "white"}
              cursor="pointer"
              _hover={{ bg: "blue.50" }}
              onClick={() => onDayClick(day)}
            >
              <VStack align="start" spacing={1} h="full">
                <Text
                  fontSize="12px"
                  fontWeight="800"
                  color={
                    !isCurrentMonth
                      ? "gray.300"
                      : isToday(day)
                        ? "blue.500"
                        : "gray.600"
                  }
                  w="24px"
                  h="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  bg={isToday(day) ? "blue.50" : "transparent"}
                >
                  {format(day, "d")}
                </Text>

                <VStack align="start" spacing={1} w="full" mt={1}>
                  {dayShifts.slice(0, 3).map((shift) => (
                    <HStack
                      key={shift.id}
                      w="full"
                      bg="gray.50"
                      p={1}
                      borderRadius="md"
                      spacing={1}
                      onClick={(e) => {
                        e.stopPropagation();
                        onShiftClick(shift);
                      }}
                    >
                      <Box
                        w="3px"
                        h="10px"
                        bg={getCategoryColor(shift.category)}
                        borderRadius="full"
                      />
                      <Text fontSize="10px" fontWeight="700" isTruncated>
                        {shift.userName}
                      </Text>
                    </HStack>
                  ))}
                  {dayShifts.length > 3 && (
                    <Text
                      fontSize="10px"
                      fontWeight="700"
                      color="gray.400"
                      mt={1}
                    >
                      +{dayShifts.length - 3} more
                    </Text>
                  )}
                </VStack>
              </VStack>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};
