"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { createProduct, updateProduct } from "../../lib/api";
import { Product } from "@/src/types/Product";
import React, { useState } from "react";

// Schéma de validation avec Zod
const schema = z.object({
  name: z.string().min(1, { message: "Le nom du produit est requis." }),
  description: z
    .string()
    .min(5, { message: "La description doit avoir au moins 5 caractères." }),
  price: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().positive({ message: "Le prix doit être supérieur à 0." })
  ),
  stock: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z
      .number()
      .int({ message: "Le stock doit être un entier." })
      .min(0, { message: "Le stock doit être au moins 0." })
  ),
  category: z.string().min(1, { message: "La catégorie est requise." }),
  quantity: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z
      .number()
      .int({ message: "La quantité doit être un entier." })
      .positive({ message: "La quantité doit être au moins 1." })
  ),
});

// Définition des types
type Inputs = z.infer<typeof schema>;

type ProductFormProps = {
  type: "create" | "update";
  data?: Product; // Données du produit à mettre à jour
  onSuccess?: () => void; // Fonction appelée après un succès
};

const ProductForm: React.FC<ProductFormProps> = ({ type, data, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data || {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      quantity: 1,
    },
  });

  const [open, setOpen] = useState(false); // Gère l'état du modal

  // Soumission du formulaire
  const onSubmit = handleSubmit(async (formData) => {
    try {
      // Vérifiez si l'API accepte un payload JSON
      const response =
        type === "create"
          ? await createProduct(formData) // Appel API pour création
          : await updateProduct(data?._id, formData); // Appel API pour mise à jour
  
      console.log("Produit ajouté/mis à jour avec succès :", response);
  
      if (onSuccess) onSuccess();
      setOpen(false);
    } catch (err) {
      console.error(
        "Erreur lors de la soumission :",
        err.response?.data || err.message
      );
    }
  });
  

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Créer un nouveau produit" : "Mettre à jour le produit"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">Informations du produit</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom du produit"
          name="name"
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Description"
          name="description"
          register={register}
          error={errors?.description}
          type="textarea"
        />
        <InputField
          label="Prix ($)"
          name="price"
          register={register}
          error={errors?.price}
          type="number"
        />
        <InputField
          label="Stock"
          name="stock"
          register={register}
          error={errors?.stock}
          type="number"
        />
        <InputField
          label="Quantité"
          name="quantity"
          register={register}
          error={errors?.quantity}
          type="number"
        />
        <InputField
          label="Catégorie"
          name="category"
          register={register}
          error={errors?.category}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Créer" : "Mettre à jour"}
      </button>
    </form>
  );
};

export default ProductForm;
