import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import Meta from "../components/Meta";
import { client } from "../lib/client";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <Meta />
      <HeroBanner heroBanner={bannerData?.[0]} />
      <main className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </main>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData?.[0]} />
    </>
  );
};

export async function getServerSideProps() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
}

export default Home;
