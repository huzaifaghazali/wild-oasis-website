![wildO7](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/e889759e-8119-4bfa-906e-bfa68d65e7e4)# The Wild Oasis Website

The Wild Oasis Website is a full-stack Next.js application where guests can learn about the Wild Oasis Hotel, browse all cabins, reserve a cabin, and create and update their profile.

## Features

- **Guest Information**: Learn all about the Wild Oasis Hotel.
- **Cabin Information**: View details about each cabin, including booked dates.
- **Filter Cabins**: Filter cabins by their maximum guest capacity.
- **Reserve Cabins**: Reserve a cabin for a certain date range.
- **Manage Reservations**: View all past and future reservations, update, or delete a reservation.
- **User Authentication**: Sign up and log in to reserve a cabin and manage reservations.
- **Profile Management**: Create and update profile information to make check-in at the hotel faster.

## Pictures

   ![wildO1](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/0f5db36f-129c-41ed-b730-5b0fcc73b497)

   ![wildO2](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/94eb57ba-51a0-4bf5-82a2-6fb7452ed88d)

   ![wildO3](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/2af479d0-42c2-4376-9697-abe9ed4158fe)

   ![wildO4](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/afa9a9ff-8478-487c-a97d-22247105b9e6)

   ![wildO5](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/724e197e-9119-402a-9eb1-b28c5941e76d)

   ![wildO6](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/e2965113-be4f-484a-a0d4-aa4ae86a6e86)

   ![wildO7](https://github.com/huzaifaghazali/wild-oasis-website/assets/63412385/3f61635e-46b3-4a22-be74-3ab5ece30763)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/huzaifaghazali/wild-oasis-website.git
   cd the-wild-oasis-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables. Create a .env.local file in the root of the project and add the following variables
   ```bash
   SUPABASE_URL
   SUPABASE_KEY
   NEXTAUTH_URL
   NEXTAUTH_SECRET
   AUTH_GOOGLE_ID
   AUTH_GOOGLE_SECRET
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `dev`: Runs the development server.
- `build`: Builds the application for production.
- `start`: Starts the application in production mode.
- `prod`: Builds and starts the application in production mode.

## Dependencies
- `@heroicons/react`: React component library for icons.
- `@supabase/supabase-js`: JavaScript client library for Supabase.
- `date-fns`: JavaScript date utility library.
- `next`: React framework for production.
- `next-auth`: Authentication for Next.js applications.
- `react`: JavaScript library for building user interfaces.
- `react-day-picker`: Date picker component for React.
- `react-dom`: Entry point of the DOM renderer for React.

## Dev Dependencies
- `eslint`: Pluggable JavaScript linter.
- `eslint-config-next`: ESLint configuration for Next.js.
- `postcss`: Tool for transforming CSS with JavaScript.
- `tailwindcss`: Utility-first CSS framework.
