import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Page() {
  return (
    <div>
    <Navigation/>
      <h1>The wild Oasis. Welcome to paradise next</h1>
      <Link href='/cabins'>Explore luxury cabins</Link>
    </div>
  );
}
