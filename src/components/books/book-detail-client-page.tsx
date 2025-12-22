"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Book, Library } from "@/lib/types";
import { RentModal } from "./rent-modal";
import { useUser } from "@/hooks/use-user";
import { CheckCircle, Library as LibraryIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BookDetailClientPageProps {
  book: Book;
  availableLibraries: Library[];
}

export default function BookDetailClientPage({ book, availableLibraries }: BookDetailClientPageProps) {
  const [isRentModalOpen, setRentModalOpen] = useState(false);
  const { user } = useUser();

  const isRentedByUser = user?.rentedBooks.some(rb => rb.bookId === book.id);
  
  if (isRentedByUser) {
    return (
        <Button disabled variant="secondary" className="w-full md:w-auto">
            <CheckCircle className="mr-2"/>
            You have this book rented
        </Button>
    )
  }

  return (
    <div className="space-y-4 pt-4">
        {availableLibraries.length > 0 ? (
            <>
                <div className="flex items-start gap-2 text-primary">
                    <LibraryIcon/>
                    <p>Available at: <span className="font-semibold">{availableLibraries.map(l => l.name).join(', ')}</span></p>
                </div>
                <RentModal
                    book={book}
                    availableLibraries={availableLibraries}
                    isOpen={isRentModalOpen}
                    setIsOpen={setRentModalOpen}
                >
                    <Button disabled={!user} className="w-full md:w-auto">Rent Book</Button>
                </RentModal>
                {!user && <p className="text-sm text-muted-foreground">You must be logged in to rent a book.</p>}
            </>
        ) : (
            <Alert variant="destructive">
                <AlertTitle>Unavailable</AlertTitle>
                <AlertDescription>This book is currently not available for rent at any library.</AlertDescription>
            </Alert>
        )}
    </div>
  );
}
