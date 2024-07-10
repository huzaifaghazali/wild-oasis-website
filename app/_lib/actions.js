'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error('Please provide a valid national ID');
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert([newBooking]);

  if (error) throw new Error('Booking could not be created');

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/cabins/thankyou');
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // Get the bookings for the logged-in user
  const guestBookings = await getBookings(session.user.guestId);
  // Extract the IDs of the bookings
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  // If the booking ID is not in the list of bookings for the user, throw an error
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are not allowed to delete this booking');
  }

  // Delete the booking from the database
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  // Revalidate the cache for the user's reservations page
  revalidatePath('/account/reservations');
}

/**
 * This function updates a booking in the database based on the provided form data.
 * The function follows the following steps:
 * 1) Authentication: Verifies that the user is logged in.
 * 2) Authorization: Verifies that the user is authorized to update the specified booking.
 * 3) Building update data: Extracts the necessary data from the form data to update the booking.
 * 4) Mutation: Updates the booking in the database with the new data.
 * 5) Error handling: Throws an error if the update fails.
 * 6) Revalidation: Revalidates the cached data for the user's reservations page.
 * 7) Redirecting: Redirects the user to the user's reservations page.
 */
export async function updateBooking(formData) {
  const bookingId = Number(formData.get('bookingId'));

  // 1) Authentication
  // Verify that the user is logged in
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId); // Get the bookings for the logged-in user
  const guestBookingIds = guestBookings.map((booking) => booking.id); // Extract the IDs of the bookings

  // Verify that the user is authorized to update the specified booking
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are not allowed to update this booking');
  }

  // 3) Building update data
  // Extract the necessary data from the form data to update the booking
  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
  };

  // 4) Mutation
  // Update the booking in the database with the new data
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error('Booking could not be updated');

  // 6) Revalidation
  // Revalidate the cached data for the user's reservations page
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath('/account/reservations');

  // 7) Redirecting
  redirect('/account/reservations');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
