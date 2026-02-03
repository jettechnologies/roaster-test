"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { SearchNormal1, Filter, Maximize4 } from "iconsax-reactjs";
import { User } from "@/data/rosterData";
import { useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { RoasterUser } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DraggableUser = ({
  user,
  isCollapsed,
}: {
  user: User;
  isCollapsed?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: user.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 100,
      }
    : undefined;

  if (isCollapsed) {
    return (
      <Box
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        cursor="grab"
        style={style}
        opacity={isDragging ? 0.5 : 1}
      >
        <Avatar
          size="sm"
          name={user.name}
          src={user.avatar ?? undefined}
          bg="gray.100"
          color="gray.600"
          fontSize="xs"
          fontWeight="700"
        >
          {user.status === "on_leave" && (
            <Box
              position="absolute"
              top="-2px"
              right="-2px"
              w="10px"
              h="10px"
              bg="red.500"
              borderRadius="full"
              border="2px solid white"
            />
          )}
        </Avatar>
      </Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      w="full"
      p={3}
      mb={3}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      bg="white"
      cursor="grab"
      style={style}
      opacity={isDragging ? 0.5 : 1}
      boxShadow="sm"
      _hover={{ borderColor: "blue.100", bg: "blue.50" }}
    >
      <VStack align="start" spacing={3}>
        <HStack w="full" justify="space-between">
          <HStack spacing={3}>
            <Avatar
              size="sm"
              name={user.name}
              src={user.avatar ?? undefined}
              bg="gray.100"
              color="gray.600"
              fontSize="xs"
              fontWeight="700"
            >
              {user.status === "on_leave" && (
                <Box
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  w="10px"
                  h="10px"
                  bg="red.500"
                  borderRadius="full"
                  border="2px solid white"
                />
              )}
            </Avatar>
            <VStack align="start" spacing={0}>
              <Text fontSize="13px" fontWeight="700" color="gray.800">
                {user.name}
              </Text>
              <HStack spacing={2}>
                <Text fontSize="10px" color="gray.400" fontWeight="600">
                  {user.contractHours || "0.0hrs"}
                </Text>
                <Text fontSize="10px" color="gray.400" fontWeight="600">
                  {user.actualHours || "0.0hrs"}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          {user.status === "on_leave" && (
            <Box px={2} py={0.5} bg="red.50" borderRadius="full">
              <Text fontSize="10px" fontWeight="800" color="red.500">
                • On leave
              </Text>
            </Box>
          )}
        </HStack>

        {user.status === "on_leave" && user.leaveRange && (
          <Text
            fontSize="10px"
            fontWeight="800"
            color="red.400"
            bg="red.50"
            px={2}
            py={0.5}
            borderRadius="md"
          >
            {user.leaveRange}
          </Text>
        )}

        <HStack w="full" justify="end" spacing={1}>
          {["m", "d", "w", "da", "vr"].map((d, i) => (
            <Box
              key={d}
              w="18px"
              h="18px"
              bg={i === 0 || i === 2 ? "green.50" : "gray.50"}
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize="9px"
                fontWeight="800"
                color={i === 0 || i === 2 ? "green.500" : "gray.300"}
              >
                {d}
              </Text>
            </Box>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export const UserAvailabilitySidebar = ({
  users,
  isCollapsed,
  onToggle,
}: {
  users: RoasterUser[];
  isCollapsed: boolean;
  onToggle: () => void;
}) => {
  const [filter, setFilter] = useState<"all" | "available" | "on_leave">("all");
  const [search, setSearch] = useState("");

  const { setNodeRef, isOver } = useDroppable({
    id: "sidebar-unassign",
  });

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "all" || user.status === filter;
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Box
      ref={setNodeRef}
      minW={isCollapsed ? "80px" : "345px"}
      bg={isOver ? "blue.50" : "white"}
      borderRight="1px solid"
      borderColor="gray.100"
      p={isCollapsed ? 4 : 6}
      h="full"
      overflowY="auto"
      transition="width 0.3s ease"
      position="relative"
    >
      <Box
        position="absolute"
        top="20px"
        right="24px"
        bg="white"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="full"
        boxSize="24px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        zIndex={10}
        onClick={onToggle}
        boxShadow="sm"
        _hover={{ bg: "gray.50" }}
      >
        <Icon
          as={isCollapsed ? ChevronRight : ChevronLeft}
          size={14}
          color="gray.600"
        />
      </Box>

      {isCollapsed ? (
        <VStack spacing={6} pt={8}>
          <Icon as={Maximize4} size={20} color="gray.400" />
          <VStack spacing={6}>
            {filteredUsers.map((user) => (
              <DraggableUser
                key={user.id}
                user={user}
                isCollapsed={isCollapsed}
              />
            ))}
          </VStack>
        </VStack>
      ) : (
        <>
          <HStack justify="space-between" mb={6}>
            <HStack spacing={2}>
              <Icon as={Maximize4} size={18} color="gray.400" />
              <Text fontWeight="800" fontSize="18px" color="gray.800">
                Roster
              </Text>
            </HStack>
          </HStack>

          <InputGroup mb={6}>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchNormal1} color="gray.400" size={18} />
            </InputLeftElement>
            <Input
              placeholder="Search"
              variant="filled"
              bg="gray.50"
              borderRadius="xl"
              fontSize="13px"
              h="44px"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              _focus={{ bg: "white", borderColor: "blue.400" }}
            />
            <Box
              ml={3}
              p={3}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.100"
              cursor="pointer"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Filter} size={18} color="gray.400" />
            </Box>
          </InputGroup>

          <HStack
            spacing={4}
            mb={6}
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            {[
              { label: "All", value: "all", count: users.length },
              {
                label: "Available",
                value: "available",
                count: users.filter((u) => u.status === "available").length,
              },
              {
                label: "On Leave",
                value: "on_leave",
                count: users.filter((u) => u.status === "on_leave").length,
              },
            ].map((t) => (
              <VStack
                key={t.value}
                spacing={2}
                cursor="pointer"
                onClick={() => setFilter(t.value as any)}
                position="relative"
              >
                <HStack spacing={1} pb={2}>
                  <Text
                    fontSize="12px"
                    fontWeight="700"
                    color={filter === t.value ? "blue.600" : "gray.400"}
                  >
                    {t.label}
                  </Text>
                  <Box
                    bg={filter === t.value ? "blue.50" : "gray.50"}
                    px={1.5}
                    borderRadius="md"
                  >
                    <Text
                      fontSize="10px"
                      fontWeight="800"
                      color={filter === t.value ? "blue.600" : "gray.400"}
                    >
                      {t.count}
                    </Text>
                  </Box>
                </HStack>
                {filter === t.value && (
                  <Box
                    w="full"
                    h="2px"
                    bg="blue.600"
                    borderRadius="full"
                    position="absolute"
                    bottom="0"
                  />
                )}
              </VStack>
            ))}
          </HStack>

          <VStack spacing={0} align="start" w="full">
            {filteredUsers.map((user) => (
              <DraggableUser
                key={user.id}
                user={user}
                isCollapsed={isCollapsed}
              />
            ))}
          </VStack>
        </>
      )}
    </Box>
  );
};
