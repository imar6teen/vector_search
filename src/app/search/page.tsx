import SearchForm from "@/components/SearchForm";
import TypeHeader from "@/components/TypeHeader";

function page() {
  return (
    <main className="m-auto w-[80%]">
      <div className="m-auto my-12 h-28 w-[40%] text-center text-6xl">
        <TypeHeader />
      </div>
      <SearchForm />
    </main>
  );
}

export default page;
