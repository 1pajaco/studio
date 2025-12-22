'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized book recommendations based on a user's previously rented genres.
 *
 * - recommendBooks - A function that takes a list of genres and returns a list of recommended books.
 * - RecommendBooksInput - The input type for the recommendBooks function.
 * - RecommendBooksOutput - The return type for the recommendBooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendBooksInputSchema = z.object({
  genres: z.array(z.string()).describe('A list of genres the user has previously rented.'),
  numberOfBooks: z.number().default(5).describe('The number of book recommendations to return.'),
});
export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendBooksOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe('The title of the recommended book.'),
      author: z.string().describe('The author of the recommended book.'),
      cover_url: z.string().describe('The URL of the book cover.'),
      synopsis: z.string().describe('A brief synopsis of the book.'),
    })
  ).describe('A list of recommended books based on the user history.')
});
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const recommendBooksPrompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {schema: RecommendBooksInputSchema},
  output: {schema: RecommendBooksOutputSchema},
  prompt: `You are a librarian specializing in personalized book recommendations.

  Based on the user's previously rented genres, provide {{numberOfBooks}} book recommendations.
  The user has previously rented books from these genres:
  {{#each genres}}
  - {{{this}}}
  {{/each}}

  Please provide the recommendations in the following JSON format:
  { "recommendations": [
      {
        "title": "Book Title",
        "author": "Author Name",
        "cover_url": "URL of the book cover",
        "synopsis": "A brief synopsis of the book."
      }
    ]
  }
  `,
});

const recommendBooksFlow = ai.defineFlow(
  {
    name: 'recommendBooksFlow',
    inputSchema: RecommendBooksInputSchema,
    outputSchema: RecommendBooksOutputSchema,
  },
  async input => {
    const {output} = await recommendBooksPrompt(input);
    return output!;
  }
);
