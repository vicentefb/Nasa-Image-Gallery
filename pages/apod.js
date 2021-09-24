import Image from 'next/image'
//  Astronomy Picture of the Day
export default function apod({nn}){
    return (
        <>
        {nn && nn.map((info) => (
        <div key={info.date} className="Imagecontainer">
            <a>
                {info.hdurl !== undefined && info.hdurl.includes(".mov") ? 
                    <video autoPlay style={{ width: '960', height: '540px' }}>
                        <source src={info.hdurl} />
                    </video>
                    :
                    <Image alt="" width={960} priority height={540} src={info.hdurl}/>}
                <div className="center"><strong>{info.title} - {info.date}</strong> </div>
                <div className="center">{info.explanation} &nbsp;</div>
            </a>
        </div>
         
        ))}
        </>
    )
}



export async function getServerSideProps(){
    const n = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&&count=5&&thumbs=True`)
    const nn = await n.json()
    //console.log("COUNT" , nn)
  
    //const apod_info = await results.json()
    //console.log("APOD" , apod_info)
    //const items = await preivew.collection.items;
  
    return{
      props:{nn}
    }
  }