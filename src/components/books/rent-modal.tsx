"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, Library } from "@/lib/types";
import { Label } from "../ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { add } from "date-fns";

interface RentModalProps {
  book: Book;
  availableLibraries: Library[];
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function RentModal({ book, availableLibraries, children, isOpen, setIsOpen }: RentModalProps) {
  const [selectedLibrary, setSelectedLibrary] = useState<string>("");
  const { toast } = useToast();

  const handleRent = () => {
    // In a real app, this would be a server action.
    console.log(`Renting "${book.title}" from library ID ${selectedLibrary}`);

    const libraryName = availableLibraries.find(lib => lib.id === selectedLibrary)?.name;

    toast({
      title: "Rental Successful!",
      description: `You've rented "${book.title}" from ${libraryName}. Return by ${add(new Date(), {days: 14}).toLocaleDateString()}.`,
    });
    setIsOpen(false);
    // Here you would also revalidate data or update the client-side state.
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">Rent "{book.title}"</DialogTitle>
          <DialogDescription>
            Select a library to pick up the book from. The rental period is 14 days.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="library" className="text-right">
              Library
            </Label>
            <Select onValueChange={setSelectedLibrary} value={selectedLibrary}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a library" />
              </SelectTrigger>
              <SelectContent>
                {availableLibraries.map((lib) => (
                  <SelectItem key={lib.id} value={lib.id}>
                    {lib.name} ({lib.location})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleRent} disabled={!selectedLibrary}>
            Confirm Rent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
