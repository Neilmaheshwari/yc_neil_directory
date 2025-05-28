import Image from "next/image";
import SearchForm from "../../components/searchform";
import StartupCard, { StartupTypeCard } from "@/components/startupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default  async function Home({searchParams}: {searchParams : Promise<{query?:string}>}) {

  const query = (await searchParams).query
  
  const params = {search:query || null}

  const session = await auth()

  console.log("Session", session?.id);
  

  const {data:posts} = await sanityFetch({query:STARTUP_QUERY , params}) 
  
  
  return (
  <>
    {/* heading input feild section */}
    <section className="pink_container">
      <h1 className="heading">pitch your startup, <br/> connect to Entrepreneurs</h1>
      <p className="sub-heading !max-w-3xl">Submit Your Ideas , Vote On Pitches and Get Noticed In Virtual Competetions</p>
      <SearchForm query={query}/>
    </section>

    {/* startup profiles rendering */}
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>

      <ul className="mt-7 card_grid">
        {posts?.length > 0 ?( posts.map((post: StartupTypeCard , index:Number) => (
            <StartupCard key={post?._id} post = {post}/>
        )))
        :(
          <p className="no-results"> No Startups Found</p>
        )}
      </ul>
    </section>

    <SanityLive/>
  </>
  );
}
