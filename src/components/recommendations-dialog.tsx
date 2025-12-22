"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { recommendBooks, type RecommendBooksOutput } from "@/ai/flows/book-recommendation";
import { books, genres as allGenres } from "@/lib/mock-data";
import { Wand2, Loader2 } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function RecommendationsDialog({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState<RecommendBooksOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const rentedBookGenres = user.rentedBooks.flatMap(rented => {
        const book = books.find(b => b.id === rented.bookId);
        return book ? book.genreIds : [];
      });
      const uniqueGenreIds = [...new Set(rentedBookGenres)];
      const genreTypes = uniqueGenreIds.map(id => allGenres.find(g => g.id === id)?.type).filter(Boolean) as string[];

      if (genreTypes.length === 0) {
        setError("You need to rent some books first to get recommendations.");
        setIsLoading(false);
        return;
      }
      
      const result = await recommendBooks({ genres: genreTypes });
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't generate recommendations at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Personalized Recommendations
          </DialogTitle>
          <DialogDescription>
            Our AI librarian will suggest books based on your rental history.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button onClick={handleGetRecommendations} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Get My Recommendations"
            )}
          </Button>

          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
             </Alert>
          )}

          {recommendations && (
            <div className="mt-4 space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              <h3 className="font-headline text-lg">Here are your picks:</h3>
              {recommendations.recommendations.map((rec, index) => (
                <div key={index} className="flex gap-4 rounded-lg border p-4">
                  <div className="relative h-32 w-24 flex-shrink-0">
                    <Image 
                      src={rec.cover_url} 
                      alt={`Cover of ${rec.title}`}
                      fill
                      sizes="96px"
                      className="rounded-md object-cover"
                      data-ai-hint="book cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">by {rec.author}</p>
                    <p className="text-sm">{rec.synopsis}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
