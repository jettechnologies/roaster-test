"use client";

import { Box, Flex, useDisclosure, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  format,
  addDays,
  subDays,
  addMonths,
  subMonths,
  startOfMonth,
} from "date-fns";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { RosterSidebar } from "@/components/roster/RosterSidebar";
import { RosterHeader } from "@/components/roster/RosterHeader";
import { PlannerToolbar } from "@/components/roster/PlannerToolbar";
import { UserAvailabilitySidebar } from "@/components/roster/UserAvailabilitySidebar";
import { CalendarGrid } from "@/components/roster/CalendarGrid";
import { ShiftDetailsModal } from "@/components/roster/ShiftDetailsModal";
import { CreateShiftModal } from "@/components/roster/CreateShiftModal";
import { MonthGrid } from "@/components/roster/MonthGrid";
import {
  Shift,
  mockShifts as initialShifts,
  mockUsers,
  timeSlots,
} from "@/data/rosterData";
import { ShiftCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  getRosterShiftsOption,
  getRosterLocationsOption,
  getRosterUsersOption,
} from "@/services/queries";
import {
  useCreateRosterShift,
  useUpdateRosterShift,
  useDeleteRosterShift,
} from "@/services/mutations";

export default function RosterPage() {
  const [viewMode, setViewMode] = useState<"live" | "plan">("live");
  const [plannerView, setPlannerView] = useState<"day" | "month">("day");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 8));
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const [createInitialData, setCreateInitialData] = useState<
    | {
        locationId?: string;
        startTime?: string;
        date?: string;
      }
    | undefined
  >(undefined);

  // Queries
  const { data: rawShifts = [], isLoading: shiftsLoading } = useQuery(
    getRosterShiftsOption(format(currentDate, "yyyy-MM-dd")),
  );
  const { data: locations = [], isLoading: locationsLoading } = useQuery(
    getRosterLocationsOption(),
  );
  const { data: users = [], isLoading: usersLoading } = useQuery(
    getRosterUsersOption(),
  );

  const isLoading = shiftsLoading || locationsLoading || usersLoading;

  // Mutations
  const { mutateAsync: createShift } = useCreateRosterShift();
  const { mutateAsync: updateShift } = useUpdateRosterShift();
  const { mutateAsync: deleteShift } = useDeleteRosterShift();

  // Map backend shifts to UI Shift interface
  const shifts: Shift[] = rawShifts.map((s: any) => ({
    id: s.id,
    userId: s.userId,
    userName: s.user?.name || "Unknown",
    title: s.title,
    startTime: s.startTime,
    endTime: s.endTime,
    category: s.category,
    locationId: s.locationId,
    color: s.color || "#E3F2FD",
  }));

  const handleViewModeChange = (mode: "live" | "plan") => {
    setViewMode(mode);
    if (mode === "live") {
      setCurrentDate(new Date(2025, 8, 8));
    } else {
      setCurrentDate(new Date(2025, 9, 1));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handlePrev = () => {
    if (plannerView === "day") {
      setCurrentDate(subDays(currentDate, 1));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (plannerView === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const handleToday = () => {
    const today = new Date(2025, 8, 8); // Mocked today
    if (plannerView === "day") {
      setCurrentDate(today);
    } else {
      setCurrentDate(startOfMonth(today));
    }
  };

  const handleNewTask = () => {
    setCreateInitialData({
      date: format(currentDate, "yyyy-MM-dd"),
    });
    onCreateOpen();
  };

  const handleShiftClick = (shift: Shift) => {
    onOpen();
  };

  const snapToNearestSlot = (time: string) => {
    const idx = timeSlots.indexOf(time);
    if (idx === -1) return timeSlots[0];
    return timeSlots[idx];
  };

  const hasOverlap = (
    locationId: string,
    newStart: string,
    newEnd: string,
    excludeShiftId?: string,
  ) => {
    return shifts.some((s) => {
      if (s.locationId !== locationId) return false;
      if (s.id === excludeShiftId) return false;

      const sStart = timeSlots.indexOf(s.startTime);
      const sEnd = timeSlots.indexOf(s.endTime);
      const nStart = timeSlots.indexOf(newStart);
      const nEnd = timeSlots.indexOf(newEnd);

      return nStart < sEnd && nEnd > sStart;
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;

    // Handle dropping a shift back onto the sidebar to unassign/delete it
    if (over.id === "sidebar-unassign" && activeId.startsWith("shift:")) {
      const shiftId = activeId.replace("shift:", "");
      try {
        await deleteShift(shiftId);
      } catch (error) {
        console.error("Unassign shift failed:", error);
      }
      return;
    }

    // Handle dropping onto the grid
    if (typeof over.id === "string" && over.id.includes(":")) {
      const [locationId, rawStartTime] = (over.id as string).split(":");
      const startTime = snapToNearestSlot(rawStartTime);
      const newStartIdx = timeSlots.indexOf(startTime);

      if (activeId.startsWith("shift:")) {
        const shiftId = activeId.replace("shift:", "");
        const existingShift = shifts.find((s) => s.id === shiftId);
        if (!existingShift) return;

        const oldStartIdx = timeSlots.indexOf(existingShift.startTime);
        const oldEndIdx = timeSlots.indexOf(existingShift.endTime);
        const duration = oldEndIdx - oldStartIdx;

        const newEndIdx = Math.min(
          newStartIdx + duration,
          timeSlots.length - 1,
        );
        const newEndTime = timeSlots[newEndIdx];

        if (hasOverlap(locationId, startTime, newEndTime, shiftId)) return;

        try {
          await updateShift({
            id: shiftId,
            params: {
              locationId,
              startTime,
              endTime: newEndTime,
            },
          });
        } catch (error) {
          console.error("Update shift failed:", error);
        }
      } else {
        // Drop user from sidebar to grid -> Create new shift
        const user = users.find((u) => u.id === activeId);
        if (!user) return;

        const endIdx = Math.min(newStartIdx + 2, timeSlots.length - 1);
        const endTime = timeSlots[endIdx];

        if (hasOverlap(locationId, startTime, endTime)) return;

        try {
          await createShift({
            userId: user.id,
            title: `${user.name.split(" ")[0]}'s Shift`,
            startTime,
            endTime,
            category: "other", // Default category
            locationId,
            date: format(currentDate, "yyyy-MM-dd"),
            color: "#E3F2FD",
          });
        } catch (error) {
          console.error("Create from sidebar failed:", error);
        }
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Box minH="100vh" bg="#F8FAFC">
        <RosterSidebar />
        <Box ml="240px" flex={1}>
          <RosterHeader />
          <Box px={8} py={4} border="2px solid black">
            <PlannerToolbar
              viewMode={viewMode}
              setViewMode={handleViewModeChange}
              plannerView={plannerView}
              setPlannerView={setPlannerView}
              currentDate={format(currentDate, "EEEE, d MMM, yyyy")}
              onPrev={handlePrev}
              onNext={handleNext}
              onToday={handleToday}
              onNewTask={handleNewTask}
            />

            <Flex
              bg="white"
              mt={6}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.100"
              overflow="hidden"
              boxShadow="sm"
              minH="calc(100vh - 250px)"
              position="relative"
            >
              {isLoading ? (
                <Flex
                  position="absolute"
                  inset={0}
                  bg="white"
                  zIndex={10}
                  align="center"
                  justify="center"
                >
                  <VStack spacing={4}>
                    <Box
                      boxSize="40px"
                      border="4px solid"
                      borderColor="blue.500"
                      borderTopColor="transparent"
                      borderRadius="full"
                      animation="spin 1s linear infinite"
                    />
                    <Text color="gray.500" fontWeight="600">
                      Loading schedules...
                    </Text>
                  </VStack>
                </Flex>
              ) : (
                <>
                  <UserAvailabilitySidebar
                    users={users}
                    isCollapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  />
                  <Box borderLeft="1px solid" borderColor="gray.100">
                    {plannerView === "day" ? (
                      <CalendarGrid
                        onShiftClick={handleShiftClick}
                        onCellClick={(locId, time) => {
                          setCreateInitialData({
                            locationId: locId,
                            startTime: time,
                            date: format(currentDate, "yyyy-MM-dd"),
                          });
                          onCreateOpen();
                        }}
                        locations={locations}
                        shifts={shifts}
                      />
                    ) : (
                      <MonthGrid
                        currentDate={currentDate}
                        shifts={shifts}
                        onShiftClick={handleShiftClick}
                        onDayClick={(date) => {
                          setCurrentDate(date);
                          setPlannerView("day");
                        }}
                      />
                    )}
                  </Box>
                </>
              )}
            </Flex>
          </Box>
        </Box>

        <ShiftDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          shifts={shifts}
          dateLabel={format(currentDate, "EEEE d")}
        />

        <CreateShiftModal
          isOpen={isCreateOpen}
          onClose={onCreateClose}
          users={users}
          locations={locations}
          initialData={createInitialData}
          onSubmit={async (data) => {
            await createShift(data);
          }}
        />
      </Box>
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </DndContext>
  );
}
