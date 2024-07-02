'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // We get the active filter from the search parameters, or default to 'all'
  const activeFilter = searchParams.get('capacity') ?? 'all';

  // This function is called when the user clicks on a new filter button
  // It updates the search parameters and navigates to the new URL
  function handleFilter(filter) {
    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams);
    // Update the 'capacity' parameter to the new filter value
    params.set('capacity', filter);
    // Replace the current URL with the new URL, without scrolling to the top
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='border border-primary-800 flex'>
      <Button
        filter='all'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter='small'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>
      <Button
        filter='medium'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter='large'
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
