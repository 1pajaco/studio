import { books, genres, inventory, libraries } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BookDetailClientPage from "@/components/books/book-detail-client-page";

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === params.id);

  if (!book) {
    notFound();
  }

  const bookGenres = book.genreIds.map(
    (id) => genres.find((g) => g.id === id)?.type
  ).filter(Boolean) as string[];

  const availableCopies = inventory.filter(
    (item) => item.bookId === book.id && item.status === "available"
  );
  
  const availableLibraries = availableCopies.map(copy => {
    return libraries.find(lib => lib.id === copy.libraryId);
  }).filter(Boolean) as typeof libraries;


  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              data-ai-hint="book cover"
            />
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{book.title}</h1>
          <p className="text-xl text-muted-foreground">by {book.author}</p>
          
          <div className="flex flex-wrap gap-2">
            {bookGenres.map(genre => (
              <Badge key={genre} variant="secondary">{genre}</Badge>
            ))}
          </div>

          <div className="text-sm text-muted-foreground space-x-4">
            <span>{book.pages} pages</span>
            <span>•</span>
            <span>Released on {new Date(book.releaseDate).toLocaleDateString()}</span>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="font-headline text-2xl">Synopsis</h2>
            <p>{book.synopsis}</p>
          </div>
          
          <BookDetailClientPage book={book} availableLibraries={availableLibraries} />

        </div>
      </div>
    </div>
  );
}
