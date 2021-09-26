import styles from "../styles/Home.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

export default function epic() {
  const [startDate, setStartDate] = useState(new Date());
  const [image, setImage] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      var month = startDate.getMonth() + 1; //months from 1-12
      var day = startDate.getDate();
      var year = startDate.getUTCFullYear();
      console.log("dia", day);
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      var query_date = year + "-" + month + "-" + day;
      console.log("query date", query_date);
      const result = await fetch(
        `https://epic.gsfc.nasa.gov/api/enhanced/date/${query_date}`
      );
      const r = await result.json();
      console.log("esto es r", r);
      if (r[0] !== undefined) {
        console.log("HOLA", r[0]);
        console.log(r[0]["image"]);
        console.log(r[0]["caption"]);
        console.log(r[0]["centroid_coordinates"]);
        var url = `https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/${day}/png/${r[0]["image"]}.png`;
        var image = { url: url, caption: r[0]["caption"] };
        console.log("URL", url);
        setImage(image);
        //setQuery(r[0]);
      } else {
        setImage(undefined);
      }
    };

    fetchData();
  }, [startDate]);
  return (
    <>
      <div className="Imagecontainer">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
      <div className="Imagecontainer">
        <a>
          {image !== undefined ? (
            <Image alt="" width={1000} priority height={1080} src={image.url} />
          ) : (
            <div>
              The selected date has no image available. Please select a
              different date.
            </div>
          )}
        </a>
      </div>
      <div className="center">{image !== undefined && image.caption}</div>
    </>
  );
}
/*
export async function getStaticProps() {
  // ask for the first 100 images without any query to have a gallery at home
  const results = await fetch(
    "https://epic.gsfc.nasa.gov/api/enhanced/available"
  );

  const dates = await results.json();

  return {
    props: { dates },
  };
}*/
