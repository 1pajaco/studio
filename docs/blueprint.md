# **App Name**: LibWise

## Core Features:

- Google Sign-In: Enable user authentication via Google Sign-In with role-based access control.
- Book Browsing: Display books in a grid format with titles and authors, differentiating admin-owned books with a distinct icon.
- Book Details: Show cover, details, available locations, and synopsis.
- Library Selection Modal: Modal allowing users to select a library when renting a book.
- Renting Workflow: Implement renting logic, including updating user's profile and setting return deadlines. On the profile page show the books the user is renting and their deadlines.
- Admin Book Management: Allow admins to add books via Google Books API autofill and remove books by toggling 'is_active'.
- Recommendation Tool: Suggest books to users based on genres they've previously rented; this tool will pick books from the genres that user has previusly rented.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) to convey knowledge and trust.
- Background color: Light Grey (#E8EAF6), a desaturated version of Indigo, for a clean and readable surface.
- Accent color: Teal (#009688), a vibrant and contrasting hue, to highlight interactive elements.
- Headline font: 'Playfair', serif, for elegant and fashionable titles. Body font: 'PT Sans', sans-serif, for readability.
- Use clear and consistent icons for navigation and actions.
- Main screen features a responsive grid for book covers and details.
- Subtle transitions for loading and interactions.