import { BookCard } from "@/components/books/book-card";
import { books } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {books
        .filter((book) => book.isActive)
        .map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
    </div>
  );
}
