import { useState } from "react";
import { AppDispatch } from "../redux/stores";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/slice/productSlice";
import ProductDeleteModal from "./ProductDeleteModal copy";
import ProductUpdateModal from "./ProductEditModal";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  stock: number;
  price: number;
}

const ProductCard = ({
  id,
  title,
  image,
  description,
  price,
  stock,
}: ProductCardProps) => {
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const handleShowModalDelete = () => setShowModalDelete(!showModalDelete);

  const handleShowModalUpdate = () => setShowModalUpdate(!showModalUpdate);

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ id }));
    handleShowModalDelete();
  };

  const handleUpdateProduct = () => {
    // dispatch(updateProduct({}));
    handleShowModalUpdate();
  };

  return (
    <div className="flex flex-col items-center p-4 border border-black w-[300px]">
      <img
        src={image}
        alt="product-image"
        className="w-[200px] h-[200px] object-cover"
      />
      <p className="font-bold ">{title}</p>
      <span>{description}</span>
      <span>stock: {stock}</span>
      <p className="font-bold text-lg">IDR {price}</p>
      <div className="flex">
        <button
          onClick={handleShowModalUpdate}
          className="bg-black px-4 py-2 text-white text-xs"
        >
          Edit
        </button>
        <button
          onClick={handleShowModalDelete}
          className="bg-red-500 px-4 py-2 text-white text-xs"
        >
          Delete
        </button>
      </div>
      <ProductUpdateModal
        onUpdate={handleUpdateProduct}
        product={{ id, title, image, description, price, stock }}
        isOpen={showModalUpdate}
        onClick={handleShowModalUpdate}
      />
      <ProductDeleteModal
        onDelete={handleDeleteProduct}
        productId={id}
        isOpen={showModalDelete}
        onClick={handleShowModalDelete}
      />
    </div>
  );
};

export default ProductCard;
