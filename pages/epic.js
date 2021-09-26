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

      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      var query_date = year + "-" + month + "-" + day;

      const result = await fetch(
        `https://epic.gsfc.nasa.gov/api/enhanced/date/${query_date}`
      );
      const metadata = await result.json();
      if (metadata[0] !== undefined) {
        var image_title = metadata[0]["image"];
        var caption = metadata[0]["caption"];
        //console.log(metadata[0]["centroid_coordinates"]);
        var url = `https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/${day}/png/${image_title}.png`;
        var image = { url: url, caption: caption };

        setImage(image);
      } else {
        setImage(undefined);
      }
    };

    fetchData();
  }, [startDate]);
  return (
    <>
      <h1 className={styles.title}>EPIC</h1>
      <p>
        Daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera
        (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point
        which provides full disc imagery of the Earth.
      </p>
      <p>
        <strong>Select a date</strong>
      </p>
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
