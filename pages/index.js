import React from "react";
import Head from "next/head";
import Root from "../components/common/Root";
import Footer from "../components/common/Footer";
import ExploreBanner from "../components/product/ExploreBanner";
import HeroSection from "../components/homepage/HeroSection";
import HomeBanner from "../components/homepage/HomeBanner";
import ProductsBanner from "../components/homepage/ProductsBanner";
import CategoryBanner from "../components/homepage/CategoryBanner";

const Home = () => (
  <Root transparentHeader={true}>
    {/* <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head> */}

    <HeroSection />
    <HomeBanner />
    <CategoryBanner />
    <ProductsBanner />
    <ExploreBanner />
    <Footer />
  </Root>
);

export default Home;
