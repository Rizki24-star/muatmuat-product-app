interface ProductModalProps {
  productId: number;
  isOpen: boolean;
  onDelete: () => void;
  onClick: () => void;
}

const ProductDeleteModal = ({
  isOpen,
  onDelete,
  onClick,
}: ProductModalProps) => {
  return (
    <div
      className={`absolute top-0 right-0 bg-black h-screen w-full bg-opacity-30 flex justify-center items-center ${!isOpen ? "hidden" : ""}`}
    >
      <div className="bg-white p-6 ">
        <p> Apakah anda yakin ingin Menghapus product ini?</p>
        <div className="flex items-center gap-4 mt-4 justify-end">
          <button onClick={onDelete} className="bg-black px-4 py-2 text-white">
            Ya
          </button>
          <button onClick={onClick} className="border border-black px-4 py-2">
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteModal;
