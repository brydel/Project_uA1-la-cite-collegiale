import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// obtenir les produit

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la recuperation des produit",error);
        throw error;
    }
};

//Ajout un produit

export const addProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit", error);
        throw error;
    }
};

// modifier un produit

export const updateProduct = async (_id, product) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/products/${_id}`, product, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error.response || error.message);
    throw error;
  }
};

  



export const createProduct = async (product) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/products",
      product, 
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit", err.response?.data || err.message);
    throw err;
  }
};

  




// supprimer un produit
export const deleteProduct = async (_id) => {
    if (!_id) {
      throw new Error("L'ID du produit est requis pour la suppression.");
    }
  
    try {
      const response = await axios.delete(`${API_URL}/${_id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.response || error.message);
      throw error;
    }
  };
  
