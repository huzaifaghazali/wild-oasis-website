import { notFound } from 'next/navigation';
import { eachDayOfInterval } from 'date-fns';
import { supabase } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

export async function getCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    notFound();
  }

  return data;
}
