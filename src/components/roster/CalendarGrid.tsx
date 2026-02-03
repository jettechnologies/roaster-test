"use client";

import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  Shift,
  Location as RosterLocation,
  timeSlots,
} from "@/data/rosterData";
import { ShiftCard } from "./ShiftCard";
import { Fragment, useMemo } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

// const DroppableCell = ({
//   id,
//   children,
//   onClick,
// }: {
//   id: string;
//   children?: React.ReactNode;
//   onClick?: () => void;
// }) => {
//   const { isOver, setNodeRef } = useDroppable({
//     id: id,
//   });

//   return (
//     <GridItem
//       ref={setNodeRef}
//       borderRight="1px solid"
//       borderBottom="1px solid"
//       borderColor="gray.100"
//       bg={isOver ? "blue.50" : "white"}
//       h="80px"
//       position="relative"
//       onClick={onClick}
//       _hover={{ bg: "gray.50" }}
//       cursor="pointer"
//     >
//       {children}
//     </GridItem>
//   );
// };

const DroppableCell = ({
  id,
  children,
  onClick,
  style,
}: {
  id: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: any;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <GridItem
      ref={setNodeRef}
      style={style}
      borderRight="1px solid"
      borderBottom="1px solid"
      borderColor="gray.100"
      bg={isOver ? "blue.50" : "white"}
      h="80px"
      position="relative"
      onClick={onClick}
      _hover={{ bg: "gray.50" }}
      cursor="pointer"
    >
      {children}
    </GridItem>
  );
};

export const CalendarGrid = ({
  onShiftClick,
  onCellClick,
  locations,
  shifts,
}: {
  onShiftClick: (shift: Shift) => void;
  onCellClick: (locationId: string, startTime: string) => void;
  locations: RosterLocation[];
  shifts: Shift[];
}) => {
  const getRowSpan = (startTime: string, endTime: string) => {
    const startIdx = timeSlots.indexOf(startTime);
    const endIdx = timeSlots.indexOf(endTime);
    return Math.max(1, endIdx - startIdx);
  };

  const getStartRow = (startTime: string) => {
    const idx = timeSlots.indexOf(startTime);
    return idx + 2; // Row 1 is header
  };

  const getColIndex = (locationId: string) => {
    return locations.findIndex((loc) => loc.id === locationId) + 2;
  };

  // Group shifts by location to calculate overlaps
  const processedShifts = useMemo(() => {
    const result: (Shift & { width: string; left: string })[] = [];

    locations.forEach((loc) => {
      const locShifts = shifts.filter((s) => s.locationId === loc.id);

      locShifts.forEach((shift) => {
        const overlaps = locShifts.filter((s) => {
          if (s.id === shift.id) return false;
          const sStart = timeSlots.indexOf(s.startTime);
          const sEnd = timeSlots.indexOf(s.endTime);
          const nStart = timeSlots.indexOf(shift.startTime);
          const nEnd = timeSlots.indexOf(shift.endTime);
          return nStart < sEnd && nEnd > sStart;
        });

        if (overlaps.length > 0) {
          const allOverlapping = [shift, ...overlaps].sort((a, b) =>
            a.id.localeCompare(b.id),
          );
          const index = allOverlapping.findIndex((s) => s.id === shift.id);
          result.push({
            ...shift,
            width: `${100 / allOverlapping.length}%`,
            left: `${(100 / allOverlapping.length) * index}%`,
          });
        } else {
          result.push({
            ...shift,
            width: "100%",
            left: "0%",
          });
        }
      });
    });

    return result;
  }, [locations, shifts]);

  console.log(locations.length, "locatin lenght ");

  return (
    <Box
      position="relative"
      minH="100vh"
      maxH="900px"
      w="100%"
      maxW="100vh"
      overflowX="auto"
      overflowY="auto"
      bg="white"
      p={0}
    >
      <Grid
        templateColumns={`80px repeat(${locations.length}, minmax(180px, 1fr))`}
        templateRows={`auto repeat(${timeSlots.length}, 80px)`}
        gap={0}
        minW={`${80 + locations.length * 180}px`}
      >
        {/* Header Corner */}
        <GridItem
          bg="#F8FAFC"
          borderBottom="1px solid"
          borderRight="1px solid"
          borderColor="gray.100"
          position="sticky"
          top={0}
          left={0}
          zIndex={3}
        />

        {/* Location Headers */}
        {locations.map((loc, i) => (
          <GridItem
            key={loc.id}
            bg={i === 0 ? "#EEF2FF" : "#F8FAFC"}
            p={4}
            borderBottom="1px solid"
            borderRight="1px solid"
            borderColor="gray.100"
            textAlign="center"
            position="sticky"
            top={0}
            zIndex={2}
          >
            <Text
              fontSize="12px"
              fontWeight="800"
              color={i === 0 ? "blue.600" : "gray.500"}
            >
              {loc.name}
            </Text>
          </GridItem>
        ))}

        {/* Time Slots and Cells */}
        {timeSlots.map((time) => (
          <Fragment key={time}>
            {/* Time Label (Sticky Left) */}
            <GridItem
              gridColumn="1"
              bg="white"
              borderBottom="1px solid"
              borderRight="1px solid"
              borderColor="gray.100"
              p={3}
              textAlign="center"
              color="gray.400"
              fontSize="11px"
              fontWeight="700"
              position="sticky"
              left={0}
              zIndex={2}
              h="80px"
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Text mt={-1}>{time}</Text>
            </GridItem>

            {/* Droppable Cells */}
            {locations.map((loc, i) => (
              <DroppableCell
                key={`${loc.id}:${time}`}
                id={`${loc.id}:${time}`}
                onClick={() => onCellClick(loc.id, time)}
                style={{ gridColumn: i + 2 }} // ← IMPORTANT FIX
              />
            ))}
          </Fragment>
        ))}

        {/* Draggable Shifts */}
        {processedShifts.map((shift) => (
          <GridItem
            key={shift.id}
            gridRow={`${getStartRow(shift.startTime)} / span ${getRowSpan(shift.startTime, shift.endTime)}`}
            gridColumn={getColIndex(shift.locationId)}
            p={1}
            zIndex={1}
            position="relative"
          >
            <Box
              position="absolute"
              top={1}
              bottom={1}
              left={shift.left}
              width={shift.width}
              px={0.5}
            >
              <DraggableShift shift={shift} onShiftClick={onShiftClick} />
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

const DraggableShift = ({
  shift,
  onShiftClick,
}: {
  shift: Shift;
  onShiftClick: (shift: Shift) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `shift:${shift.id}`,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      h="full"
      style={style}
      opacity={isDragging ? 0.6 : 1}
      pointerEvents="auto"
    >
      <ShiftCard shift={shift} onClick={() => onShiftClick(shift)} />
    </Box>
  );
};
