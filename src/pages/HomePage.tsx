import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/stores";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>();
  const productState = useSelector((state: RootState) => state.products);

  useEffect(() => {
    console.log(search);
    if (search) {
      setProducts(
        productState.products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setProducts(productState.products);
    }
  }, [search, productState]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="mx-4 flex-col">
      <div className="py-4 flex flex-col md:flex-row justify-between ">
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="border border-black px-4 py-2"
            placeholder="Find products..."
            value={search}
            onChange={handleInputChange}
          />
          <select name="" id="" className="border border-black px-4 py-2">
            <option value="">Sort by</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </div>
        <Link
          to="/add"
          className="text-white px-4 py-2 bg-black mt-4 md:mt-0 text-center"
        >
          Add products
        </Link>
      </div>
      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p className="italic">Products not found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
