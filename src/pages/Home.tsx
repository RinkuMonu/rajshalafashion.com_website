// import React, { useState } from "react";
import Banner from "../components/home/Banner";
import TrendingProducts from "../components/home/TrendingProducts";
import Arrivals from "../components/home/Arrivals";
import DealOfTheDay from "../components/home/DealOfTheDay";

import TopCategories from "../components/home/TopCategories";
// import Newsletter from "../components/home/Newsletter";
// import HowItWorks from "../components/home/HowItWorks";
// import DeliveryFeatures from "../components/home/DeliveryFeatures";

// import FAQComponent from '../components/home/FAQComponent';


import axios from "axios";
import { useEffect } from "react";
// import BlockImageSection from "../components/home/Blockimage";
// import ElevatedSection from "../components/home/Elevated";
import Blazer from "../components/home/Blazer";
import Jeans from "../components/home/Jeans";
import Casual from "../components/home/Casual";
import TreckPents from "../components/home/TreckPents";
import BannerSection1 from "../components/banner/Banner1";
import BannerSection2 from "../components/banner/Banner2";
import Activeuser from "../components/home/Activeuser";
import { Product } from "../types";

interface HomeProps {
  addToCart: (product: Product) => void;
  onCartClick: () => void;
}

export default function Home({ addToCart }: HomeProps) {
  // const [loading2, setLoading2] = useState(false);

  // const data = {
  //   name: "Waleed",
  //   amount: 1,
  //   number: "7498608775",
  //   MUID: "MUID" + Date.now(),
  //   transactionId: "T" + Date.now(),
  // };

  // const handlePayment = (e) => {
  //   e.preventDefault();
  //   setLoading2(true);
  //   axios
  //     .post("https://sevenunique-backend.onrender.com/api/v1/payment/payment", { ...data })
  //     .then((res) => {
  //       setTimeout(() => {
  //         setLoading2(false);
  //       }, 1500);
  //     })
  //     .catch((error) => {
  //       setLoading2(false);
  //       console.error(error);
  //     });
  // };
  useEffect(() => {
    const fetchAndPostData = async () => {
      try {
        // Pehli API se data fetch karna
        const response = await axios.get("https://www.JAJAMtech.in/payoutCallback");
        const fetchedData = response.data;

        console.log("Fetched Data:", fetchedData);

        // Dusri API me post karna
        const postResponse = await axios.post("https://api.worldpayme.com/api/mypaycallback", fetchedData);

        console.log("Post Response:", postResponse.data);
      } catch (error) {
        // Silently handle error - this is not critical for app functionality
        console.log("Payment callback service unavailable");
      }
    };

    fetchAndPostData();
    // Har 1 minute (60,000 ms) me call karna
    const intervalId = setInterval(fetchAndPostData, 60000);

    // Cleanup function (memory leak se bachne ke liye)
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Banner />
      <TrendingProducts addToCart={addToCart} />
      <TreckPents />
      <Arrivals addToCart={addToCart} />
      <BannerSection1 />
      <DealOfTheDay addToCart={addToCart} />
      <TopCategories />
      {/* <Activeuser /> */}
      {/* <HowItWorks /> */}
      {/* <DeliveryFeatures /> */}
      {/* <FAQComponent /> */}
      {/* <Newsletter /> */}
      <Casual />
      <BannerSection2 />
      <Blazer />
      <Jeans />
    </>
  );
}
