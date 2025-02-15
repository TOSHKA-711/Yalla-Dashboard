import React, { useContext } from "react";
import "./BookPage.css";
import img1 from "../../../assets/imgs/—Pngtree—vs_5054241.png";
import img2 from "../../../assets/imgs/avatar1.png";
import { MyContext } from "../../ContextApi/Provider";
import { FaMapLocationDot } from "react-icons/fa6";
import DetailsCard from "../../items/DetailsCard/DetailsCard";
import { PiCourtBasketballFill } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function BookPage() {
  const { selectedBook, setSelectedPlayer } = useContext(MyContext);
  console.log(selectedBook.img);

  const navigate = useNavigate();

  const handlePlayerSelect = (e) => {
    setSelectedPlayer(e);
    navigate("/userBooking");
  };

  return (
    <div className="book-page flex-col">
      <div className="header">
        <div className="layer"></div>
        <img src={"https://th.bing.com/th/id/OIP.2t9dkwas-DhXABBWRZkiRAHaE8?rs=1&pid=ImgDetMain"}></img>
        <div className="players flex-row">
          <div className="child flex-col">
            <span
              className=" flex-row"
              onClick={() => handlePlayerSelect(selectedBook.me.id)}
            >
              <p> {selectedBook.name ? selectedBook.name : "Ali"}</p>
              <img src={selectedBook.gust_one ? selectedBook.gust_one : img2} />
            </span>
            <span
              className=" flex-row"
              onClick={() => handlePlayerSelect(selectedBook.gust_one.id)}
            >
              <p>
                {" "}
                {selectedBook.gust_one ? selectedBook.gust_one.name : "Ahmed"}
              </p>
              <img
                src={selectedBook.gust_one ? selectedBook.gust_one.image : img2}
              />
            </span>
          </div>
          <div className="child flex-col">
            <span className=" flex-row">
              <img src={img1} />
            </span>
          </div>
          <div className="child flex-col">
            <span
              className=" flex-row-reverse"
              onClick={() => handlePlayerSelect(selectedBook.gust_tow.id)}
            >
              <p>
                {" "}
                {selectedBook.gust_tow ? selectedBook.gust_tow.name : "Mahmoud"}
              </p>
              <img
                src={selectedBook.gust_tow ? selectedBook.gust_tow.image : img2}
              />
            </span>
            <span
              className=" flex-row-reverse"
              onClick={() => handlePlayerSelect(selectedBook.gust_three.id)}
            >
              <p>
                {" "}
                {selectedBook.gust_three
                  ? selectedBook.gust_three.name
                  : "Mostafa"}
              </p>
              <img
                src={
                  selectedBook.gust_three ? selectedBook.gust_three.image : img2
                }
              />
            </span>
          </div>
        </div>
      </div>
      <div className="content flex-col">
        <div className="  details">
          <DetailsCard
            first={selectedBook.item.title}
            last="playground"
            third={`4`}
            icon={<PiCourtBasketballFill className="moon" />}
          />
          <DetailsCard
            first={"Makkah"}
            last="location"
            third=""
            icon={<FaMapLocationDot className="moon" />}
          />
          <DetailsCard
            first={`100 SAR / 60 minutes`}
            last="price"
            third=" SAR"
            icon={<FaSackDollar className="moon" />}
          />
          <DetailsCard
            first={selectedBook.scheduled.formatted_date}
            last="scheduled"
            third={`/ ${selectedBook.scheduled.time}`}
            icon={<BsCalendar2DateFill className="moon" />}
          />
        </div>
      </div>
    </div>
  );
}
