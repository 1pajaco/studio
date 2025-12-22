"use client";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { inventory } from "@/lib/mock-data";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const { user } = useUser();
  
  const isAdminOwner =
    user?.role === "admin" &&
    inventory.some(i => i.bookId === book.id && i.libraryId === user.libraryId);

  return (
    <Link href={`/books/${book.id}`} className="group relative block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="book cover"
            />
            {isAdminOwner && (
              <div className="absolute top-2 right-2 rounded-full bg-primary/80 p-1.5 text-primary-foreground backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="truncate font-bold font-headline text-md" title={book.title}>
              {book.title}
            </h3>
            <p className="truncate text-sm text-muted-foreground" title={book.author}>
              {book.author}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
