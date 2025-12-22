"use client";

import { useState } from "react";
import { User } from "@/lib/types";
import { books, libraries } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay, parseISO } from "date-fns";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExternalLink } from "lucide-react";

interface RentedBooksProps {
  rentedBooks: User["rentedBooks"];
}

export default function RentedBooks({ rentedBooks }: RentedBooksProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const rentedBookDetails = rentedBooks.map((rb) => {
    const book = books.find((b) => b.id === rb.bookId);
    const library = libraries.find((l) => l.id === rb.libraryId);
    return { ...rb, book, library };
  });

  const dueDates = rentedBookDetails.map((rb) => parseISO(rb.dueDate));

  const booksDueOnSelectedDate = date
    ? rentedBookDetails.filter((rb) => isSameDay(parseISO(rb.dueDate), date))
    : [];

  if (rentedBooks.length === 0) {
    return (
        <Alert>
            <AlertTitle>No Rented Books</AlertTitle>
            <AlertDescription>You haven't rented any books yet. Go explore the library!</AlertDescription>
        </Alert>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{ due: dueDates }}
          modifiersStyles={{
            due: { border: "2px solid hsl(var(--primary))", borderRadius: '9999px' },
          }}
        />
      </div>
      <div className="space-y-4">
        <h3 className="font-headline text-lg">
          {date ? `Books due on ${date.toLocaleDateString()}` : "Select a date to see due books"}
        </h3>
        {booksDueOnSelectedDate.length > 0 ? (
          <div className="space-y-4">
            {booksDueOnSelectedDate.map(({ book, library, dueDate }) =>
              book && library ? (
                <Link href={`/books/${book.id}`} key={book.id}>
                    <Card className="flex items-center gap-4 p-3 hover:bg-muted/50 transition-colors">
                    <div className="relative h-20 w-14 flex-shrink-0">
                        <Image
                        src={book.coverUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        sizes="56px"
                        className="rounded-sm object-cover"
                        data-ai-hint="book cover"
                        />
                    </div>
                    <div>
                        <p className="font-bold">{book.title}</p>
                        <p className="text-sm text-muted-foreground">by {book.author}</p>
                        <p className="text-xs mt-1">From: {library.name}</p>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Card>
                </Link>
              ) : null
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">No books due on this day.</p>
        )}
      </div>
    </div>
  );
}
