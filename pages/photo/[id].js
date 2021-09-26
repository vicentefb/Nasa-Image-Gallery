import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function photo({ photo, description }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // if no fallback and no photo return error page
  if (!router.isFallback && !photo) {
    return <div>ERROR 4040 PAGE NOT FOUND</div>;
  }
  return (
    <div>
      <div className="Imagecontainer">
        {router.isFallback ? (
          <div>Loading... </div>
        ) : (
          <>
            <Image alt="" width={960} priority height={540} src={photo} />
          </>
        )}
      </div>
      <div className="center">
        <p>{description}</p>
      </div>
      <div className="Imagecontainer">
        <Link className="homeButton" href="/">
          <a>
            <button className="button">Go Home</button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  // take the params from below
  const nasa_id = params.id;
  const results = await fetch(`https://images-api.nasa.gov/asset/${nasa_id}`);
  const metadata = await fetch(
    `https://images-api.nasa.gov/metadata/${nasa_id}`
  );

  const info = await metadata.json();

  const details = await (await fetch(info.location)).json();
  const description = details["XMP:Description"];

  const preview = await results.json();
  const photo = await preview.collection.items[0].href;

  return {
    props: { photo, description },
  };
}

export async function getStaticPaths() {
  const results = await fetch(
    "https://images-api.nasa.gov/search?media_type=image"
  );

  const preivew = await results.json();
  const items = await preivew.collection.items;

  return {
    paths:
      items?.map((nasa) => ({
        params: {
          id: nasa.data[0].nasa_id,
        },
      })) || [],
    fallback: true,
  };
}
