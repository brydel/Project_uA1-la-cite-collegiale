import React, { useEffect, useState } from "react";
import { MdEdit, MdAdd, MdDelete } from "react-icons/md";
import Table from "../components/Table";
import ProductModal from "../components/ProductModal";
import Pagination from "../components/Pagination";
import TableSearch from "../components/TableSearch";
import { Product } from "../types/Product";

import { fetchProducts, deleteProduct } from "../lib/api";



const columns = [
  {
    header: "Nom",
    accessor: "name",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Prix ($CA)",
    accessor: "price",
    className: "text-right",
  },
  {
    header: "Stock",
    accessor: "stock",
    className: "text-right hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "px-4 md:px[50px]",
  },
];

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  const refreshProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data); 
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des produits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);


  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      console.error("ID manquant pour la suppression !");
      return;
    }
    try {
      await deleteProduct(id); 
      setProducts((prev) => prev.filter((product) => product._id !== id)); 
      console.log(`Produit supprimé : ${id}`);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  
  const renderRow = (item: Product) => (
    <tr
      className="border-b border-gray-200 even:bg-green-50 text-sm hover:bg-brydelPurpleLight"
      key={item._id} 
    >
      <td className="p-4 flex items-center gap-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.description}</td>
      <td className="text-right">{item.price.toFixed(2)} $</td>
      <td className="text-right hidden md:table-cell">{item.stock}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
         
          <ProductModal
            type="update"
            data={item}
            onActionComplete={refreshProducts} 
          />

          
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full bg-brydelPurple hover:bg-brydelPurpleLight"
            onClick={() => handleDelete(item._id)}
          >
            <MdDelete size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

 
  if (loading) return <p className="flex flex-col justify-center items-center">Chargement des produits...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Tous les Produits</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
           
            <ProductModal type="create" onActionComplete={refreshProducts} />
          </div>
        </div>
      </div>

      
      <Table columns={columns} renderRow={renderRow} data={products} />

      <Pagination />
    </div>
  );
};

export default Dashboard;