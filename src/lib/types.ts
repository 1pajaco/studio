export type User = {
  id: string;
  username: string;
  email: string;
  role: 'standard' | 'admin';
  rentedBooks: { bookId: string; libraryId: string; dueDate: string }[];
  libraryId?: string; // For admins
};

export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  synopsis: string;
  pages: number;
  releaseDate: string;
  genreIds: string[];
  isActive: boolean;
};

export type Library = {
  id: string;
  name: string;
  location: string;
};

export type Inventory = {
  id: string;
  bookId: string;
  libraryId: string;
  status: 'available' | 'rented';
  currentUserId: string | null;
};

export type Genre = {
  id: string;
  type: string;
};
