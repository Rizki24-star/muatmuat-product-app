import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/stores";
import { Product } from "../types";
import { z } from "zod";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { updateProduct } from "../redux/slice/productSlice";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onUpdate: () => void;
  onClick: () => void;
}

const ProductDataSchema = z.object({
  title: z.string(),
  image: z.string(),
  stock: z
    .number()
    .min(1, { message: "Product stock must be greater than zero" }),
  price: z
    .number()
    .min(1, { message: "Product price must be greater than zero" }),
  description: z.string(),
});

const ProductUpdateModal = ({
  product,
  isOpen,
  onClick,
}: ProductModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [productData, setProductData] = useState<Product>({
    id: product.id,
    title: product.title,
    image: product.image,
    stock: product.stock,
    price: product.price,
    description: product.description,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { products } = useSelector((state: RootState) => state.products);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validate = ProductDataSchema.safeParse(productData);
      if (!validate.success) {
        console.log(validate.error.issues);
        let newErrors = {};
        validate.error.issues.forEach((error) => {
          newErrors = { ...newErrors, [error.path[0]]: error.message };
        });
        setErrors(newErrors);
      } else {
        dispatch(updateProduct({ updatedProduct: productData }));
        setErrors({});
        onClick();
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(products);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "stock" || name === "price") {
      setProductData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setProductData((state) => ({ ...state, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setProductData((state) => ({
        ...state,
        image: Array.from(file)[0].name.toString(),
      }));
    }
  };

  return (
    <div
      className={`absolute top-0 right-0 bg-black h-screen w-full  px-4 bg-opacity-30 flex justify-center items-center  ${!isOpen ? "hidden" : ""}`}
    >
      <div className="bg-white p-6 w-full max-w-[80%]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl text-black font-bold ">Update Product</p>
          <button className="font-bold" onClick={onClick}>
            x
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-4 border border-black border-dashed text-center cursor-pointer overflow-hidden px-2">
            <label htmlFor="image" className="text-gray-500">
              {productData.image ? productData.image : "Choose image"}
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleFileChange}
              className="border border-black px-4 py-2 hidden"
              accept="image/png, image/jpg, image/jpeg"
            />
            {errors.image && (
              <span className="text-red-500 italic">{errors.image}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="title">Product title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              className="border border-black px-4 py-2"
              // required
            />
            {errors.title && (
              <span className="text-red-500 italic">{errors.title}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">description</label>
            <input
              id="description"
              type="text"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="border border-black px-4 py-2"
              required
            />
            {errors.description && (
              <span className="text-red-500 italic">{errors.description}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock">stock</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={productData.stock || ""}
              onChange={handleInputChange}
              className="border border-black px-4 py-2"
              min={1}
              required
            />
            {errors.stock && (
              <span className="text-red-500 italic">{errors.stock}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={productData.price || ""}
              onChange={handleInputChange}
              className="border border-black px-4 py-2"
              min={1}
              required
            />
            {errors.price && (
              <span className="text-red-500 italic">{errors.price}</span>
            )}
          </div>
          <button type="submit" className="bg-black px-4 py-2 text-white mt-6">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateModal;
