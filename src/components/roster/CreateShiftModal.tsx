"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ShiftCategory } from "@/types";
import { User, Location, timeSlots } from "@/data/rosterData";
import { format } from "date-fns";

interface CreateShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  users: User[];
  locations: Location[];
  initialData?: {
    locationId?: string;
    startTime?: string;
    date?: string;
  };
}

export const CreateShiftModal = ({
  isOpen,
  onClose,
  onSubmit,
  users,
  locations,
  initialData,
}: CreateShiftModalProps) => {
  const [formData, setFormData] = useState({
    userId: "",
    locationId: "",
    title: "",
    startTime: "09:00",
    endTime: "10:00",
    date: format(new Date(), "yyyy-MM-dd"),
    category: "other" as any,
    color: "#E3F2FD",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        userId: users[0]?.id || "",
        locationId: initialData?.locationId || locations[0]?.id || "",
        startTime: initialData?.startTime || "09:00",
        endTime: initialData?.startTime
          ? timeSlots[
              Math.min(
                timeSlots.indexOf(initialData.startTime) + 2,
                timeSlots.length - 1,
              )
            ]
          : "10:00",
        date: initialData?.date || format(new Date(), "yyyy-MM-dd"),
        title: "",
        category: "other",
      }));
    }
  }, [isOpen, initialData, users, locations]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to create shift:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl">
        <form onSubmit={handleSubmit}>
          <ModalHeader borderBottom="1px solid" borderColor="gray.100">
            Nieuwe Taak Aanmaken
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="13px" fontWeight="700" color="gray.600">
                  Medewerker
                </FormLabel>
                <Select
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  borderRadius="xl"
                  h="44px"
                  fontSize="14px"
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="13px" fontWeight="700" color="gray.600">
                  Locatie
                </FormLabel>
                <Select
                  name="locationId"
                  value={formData.locationId}
                  onChange={handleChange}
                  borderRadius="xl"
                  h="44px"
                  fontSize="14px"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="13px" fontWeight="700" color="gray.600">
                  Titel
                </FormLabel>
                <Input
                  name="title"
                  placeholder="bijv: Surgery, Consultation"
                  value={formData.title}
                  onChange={handleChange}
                  borderRadius="xl"
                  h="44px"
                  fontSize="14px"
                />
              </FormControl>

              <HStack w="full" spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="13px" fontWeight="700" color="gray.600">
                    Begintijd
                  </FormLabel>
                  <Select
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    borderRadius="xl"
                    h="44px"
                    fontSize="14px"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="13px" fontWeight="700" color="gray.600">
                    Eindtijd
                  </FormLabel>
                  <Select
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    borderRadius="xl"
                    h="44px"
                    fontSize="14px"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>

              <HStack w="full" spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="13px" fontWeight="700" color="gray.600">
                    Datum
                  </FormLabel>
                  <Input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    borderRadius="xl"
                    h="44px"
                    fontSize="14px"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="13px" fontWeight="700" color="gray.600">
                    Categorie
                  </FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    borderRadius="xl"
                    h="44px"
                    fontSize="14px"
                  >
                    {Object.values(ShiftCategory).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderTop="1px solid" borderColor="gray.100">
            <Button variant="ghost" mr={3} onClick={onClose} borderRadius="xl">
              Annuleren
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
              borderRadius="xl"
              px={8}
            >
              Taak Aanmaken
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
