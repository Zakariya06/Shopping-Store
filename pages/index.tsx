import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AppLayout from "@/layout/AppLayout";
import { Menu } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";
import { JSX, useEffect } from "react";
import withAuth from "@/hoc/withAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Home = (props: any): JSX.Element => {
  const { products } = props;
  const { query } = useRouter();

  return (
    <div className={`${geistSans.className} ${geistMono.className}  `}>
      <AppLayout>
        <div className="min-h-screen  text-white">
          {!query.search && (
            <>
              <nav className="bg-amazon_light text-white text-sm   py-2">
                <div className=" flex space-x-4 items-center">
                  <div className="flex items-center space-x-1">
                    <Menu size={16} />
                    <span className="font-semibold">All</span>
                  </div>
                  <span>Today's Deals</span>
                  <span>Customer Service</span>
                  <span>Registry</span>
                  <span>Gift Cards</span>
                  <span>Sell</span>
                </div>
              </nav>

              {/* Hero Banner */}
              <section className="relative  w-full my-4">
                <Image
                  src="https://m.media-amazon.com/images/I/6139RPb9dxL._SX1500_.jpg"
                  alt="Amazon Hero"
                  className="z-0 w-full h-auto"
                  width={"3840"}
                  height={"2160"}
                  loading="lazy"
                />
              </section>
            </>
          )}

          {/* Product Grid Placeholder */}
          <main className=" ">
            <h2 className="text-2xl font-bold mb-4">
              {" "}
              {products?.products.length === 0 ? (
                <>
                  No Products Found{" "}
                  <span className="text-[#FF6201]">{query.search}</span>{" "}
                </>
              ) : (
                "Featured Products"
              )}{" "}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.products.map((product: any, index: any) => (
                <div className="product-card" key={product.title}>
                  <div className="badge">{product.brand}</div>
                  <div className="product-tumb">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={"1920"}
                      height={"1080"}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">
                      Category : {product.category}
                    </span>
                    <h4>
                      <a href="">{product.title}</a>
                    </h4>
                    <p>{product.description}</p>
                    <div className="product-bottom-details">
                      <div className="product-price">
                        <small>${product.price}</small>
                        {(
                          product.price -
                          (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </div>
                      <div className="product-links">
                        <a href="">
                          <i className="fa fa-heart" />
                        </a>
                        <a href="">
                          <i className="fa fa-shopping-cart" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const isSearch = query.search || null;

  let products = null;

  try {
    if (isSearch) {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${isSearch}`
      );
      products = response.data;
    } else {
      const response = await axios.get("https://dummyjson.com/products");
      products = response.data;
    }
  } catch (error) {
    console.log("Data fetching Error on Server", error);
  }

  return {
    props: {
      products,
    },
  };
};

export default withAuth(Home);
