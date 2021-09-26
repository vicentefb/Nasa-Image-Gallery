import Image from "next/image";
import Link from "next/link";
// We will pass information from NASA Api to this component
// We pass the nasaId to the Link so that when we click on it, it will query and return the image to the user

export default function ImagePreview({ thumbnailUrl, nasaId, location }) {
  return (
    <div>
      <Link as={`/photo/${nasaId}`} href="/photo/[id]">
        <a>
          <Image alt="" width={250} height={125} src={thumbnailUrl} />
          <div className="nasaId">{location} </div>
        </a>
      </Link>
    </div>
  );
}
