"use client";

import { useState } from "react";
import { MdClose, MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ProductForm from "./forms/ProductForm";
import { deleteProduct } from "../lib/api"; 
import { Product } from "../types/Product";




const ProductModal = ({
  type,
  data,
  id,
  onActionComplete, 
}: {
  type: "create" | "update" | "delete";
  data?: Product;
  id?: string;
  onActionComplete?: () => void; 
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-brydelYellow"
      : type === "update"
      ? "bg-brydelSky"
      : type === "delete"
      ? "bg-brydelPurple"
      : "";

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteProduct(id); 
        console.log(`Produit supprimé : ${id}`);
        setOpen(false); 
        if (onActionComplete) onActionComplete(); 
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
      }
    }
  };

  const Form = () => {
    if (type === "delete" && id) {
      return (
        <div className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            Toutes les données seront perdues. Êtes-vous sûr de vouloir supprimer ce produit ?
          </span>
          <button
            className="mt-2 w-max bg-brydelPurple hover:bg-brydelPurple text-white text-sm font-semibold py-2 px-4 rounded-full border-none self-center"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Supprimer
          </button>
        </div>
      );
    } else if (type === "create" || type === "update") {
      return (
        <ProductForm
          type={type}
          data={data}
          onSuccess={() => {
            setOpen(false); 
            if (onActionComplete) onActionComplete(); 
          }}
        />
      );
    } else {
      return <p className="text-center text-red-500">Formulaire indisponible</p>;
    }
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        {type === "create" ? <MdAdd size={16} /> : type === "update" ? <MdEdit size={16} /> : <MdDelete size={16} />}
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-2 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <MdClose size={16} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
