"use client";

import {
  Box,
  HStack,
  Text,
  Button,
  Icon,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  ArrowLeft2,
  ArrowRight2,
  Calendar,
  Lock,
  Send2,
  Element3,
  RowHorizontal,
  Setting4,
  People,
  FilterSearch,
  Add,
  ArrowDown2,
} from "iconsax-reactjs";

export const PlannerToolbar = ({
  viewMode,
  setViewMode,
  plannerView,
  setPlannerView,
  currentDate,
  onPrev,
  onNext,
  onToday,
  onNewTask,
}: {
  viewMode: "live" | "plan";
  setViewMode: (val: "live" | "plan") => void;
  plannerView: "day" | "month";
  setPlannerView: (val: "day" | "month") => void;
  currentDate: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onNewTask: () => void;
}) => {
  return (
    <Box py={2} bg="white" px={4}>
      <HStack justify="space-between" mb={4}>
        <Text fontSize="18px" fontWeight="700" color="gray.800">
          Planner
        </Text>

        <HStack spacing={2}>
          <Button
            variant="outline"
            size="sm"
            leftIcon={
              <Icon
                as={ArrowDown2}
                size={14}
                style={{ transform: "rotate(90deg)" }}
              />
            }
            borderRadius="lg"
            fontSize="13px"
            fontWeight="600"
            color="gray.700"
          >
            Open Days
          </Button>
          <Button
            colorScheme="gray"
            variant="outline"
            size="sm"
            leftIcon={<Icon as={Add} size={16} />}
            rightIcon={<Icon as={ArrowDown2} size={14} />}
            borderRadius="lg"
            fontSize="13px"
            fontWeight="600"
            onClick={onNewTask}
          >
            Nieuw
          </Button>
        </HStack>
      </HStack>

      <Box
        bg={viewMode === "live" ? "red.50" : "blue.50"}
        borderRadius="full"
        p={1.5}
        mb={6}
        border="1px solid"
        borderColor={viewMode === "live" ? "red.200" : "blue.200"}
      >
        <HStack spacing={4}>
          <HStack bg="white" p={0.5} borderRadius="full" boxShadow="sm">
            <Button
              size="xs"
              variant={viewMode === "live" ? "solid" : "ghost"}
              bg={viewMode === "live" ? "red.500" : "transparent"}
              color={viewMode === "live" ? "white" : "gray.500"}
              _hover={{ bg: viewMode === "live" ? "red.600" : "gray.100" }}
              onClick={() => setViewMode("live")}
              borderRadius="full"
              px={4}
              fontSize="11px"
              fontWeight="700"
              h="24px"
            >
              Live
            </Button>
            <Button
              size="xs"
              variant={viewMode === "plan" ? "solid" : "ghost"}
              bg={viewMode === "plan" ? "blue.600" : "transparent"}
              color={viewMode === "plan" ? "white" : "gray.500"}
              _hover={{ bg: viewMode === "plan" ? "blue.700" : "gray.100" }}
              onClick={() => setViewMode("plan")}
              borderRadius="full"
              px={4}
              fontSize="11px"
              fontWeight="700"
              h="24px"
            >
              Planner
            </Button>
          </HStack>
          <Text fontSize="12px" color="gray.600" fontWeight="500">
            Description of the {viewMode} view
          </Text>
        </HStack>
      </Box>

      <HStack justify="space-between" py={2}>
        <HStack spacing={4}>
          <HStack
            bg="gray.50"
            px={3}
            py={1.5}
            borderRadius="full"
            border="1px solid"
            borderColor="gray.100"
          >
            <Text fontSize="12px" color="gray.500" fontWeight="500">
              {currentDate.split(",")[0]}{" "}
              <Text as="span" fontWeight="800" color="gray.800">
                {currentDate.split(" ")[1]?.replace(",", "")}
              </Text>
            </Text>
          </HStack>
          <Text fontWeight="700" fontSize="16px" color="gray.800">
            {currentDate.split(",").slice(1).join(",")}
          </Text>
        </HStack>

        <HStack spacing={3}>
          <HStack spacing={2}>
            <Box
              p={2}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
            >
              <Icon as={People} size={18} color="gray.600" />
            </Box>
            <Box
              p={2}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
            >
              <Icon as={FilterSearch} size={18} color="gray.600" />
            </Box>
          </HStack>

          <HStack
            bg="gray.50"
            p={1}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            <Button
              variant="ghost"
              size="xs"
              onClick={onPrev}
              p={1}
              h="28px"
              w="28px"
            >
              <Icon as={ArrowLeft2} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={onToday}
              fontSize="12px"
              fontWeight="600"
              h="28px"
            >
              Current {plannerView === "day" ? "day" : "month"}
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={onNext}
              p={1}
              h="28px"
              w="28px"
            >
              <Icon as={ArrowRight2} size={16} />
            </Button>
          </HStack>

          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant="outline"
              borderRadius="lg"
              fontSize="12px"
              fontWeight="600"
              h="36px"
              leftIcon={
                <Box w="8px" h="8px" bg="green.400" borderRadius="full" />
              }
              rightIcon={<Icon as={ArrowDown2} size={14} />}
            >
              {plannerView === "day" ? "This day" : "Maand"}
            </MenuButton>
            <MenuList fontSize="13px" zIndex={20} shadow="2xl">
              <MenuItem onClick={() => setPlannerView("day")}>
                Deze daag
              </MenuItem>
              <MenuItem>Deze week</MenuItem>
              <MenuItem onClick={() => setPlannerView("month")}>Maand</MenuItem>
              <MenuItem>Custom +</MenuItem>
            </MenuList>
          </Menu>

          <Button
            variant="outline"
            size="sm"
            fontSize="12px"
            fontWeight="700"
            h="36px"
            borderRadius="lg"
            px={4}
          >
            Publish All
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Icon as={Lock} size={16} />}
            fontSize="12px"
            fontWeight="700"
            h="36px"
            borderRadius="lg"
            px={4}
          >
            Lock Shift
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};
