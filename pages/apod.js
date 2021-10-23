import Image from "next/image";
//  Astronomy Picture of the Day
export default function apod({ apod_info }) {
  return (
    <>
      {apod_info &&
        apod_info.map((info) => (
          <div key={info.date} className="Imagecontainer">
            <a>
              {info.hdurl !== undefined &&
              (info.hdurl.includes(".mov") || info.hdurl.includes(".mp4")) ? (
                <video autoPlay style={{ width: "960", height: "540px" }}>
                  <source src={info.hdurl} />
                </video>
              ) : (
                <Image
                  alt=""
                  width={960}
                  priority
                  height={540}
                  src={info.hdurl}
                />
              )}
              <div className="center">
                <strong>
                  {info.title} - {info.date}
                </strong>{" "}
              </div>
              <div className="center">{info.explanation} &nbsp;</div>
            </a>
          </div>
        ))}
    </>
  );
}

export async function getStaticProps() {
  const result = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&&count=5&&thumbs=True`
  );
  const apod_info = await result.json();

  return {
    props: { apod_info },
    revalidate: 5,
  };
}
