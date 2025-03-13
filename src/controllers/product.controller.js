import ProductRepository from "../repositories/product.repository.js";
import ProductDAO from "../daos/product.dao.js";

const productRepository = new ProductDAO(); // Instancia del DAO

// Crear un producto (Solo Admin)
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    // Validaciones básicas
    if (!name || price == null || stock == null) {
      return res.status(400).json({ message: "Todos los campos son obligatorios: name, price, stock" });
    }

    if (price <= 0 || stock < 0) {
      return res.status(400).json({ message: "El precio y el stock deben ser valores positivos" });
    }

    const newProduct = await productRepository.createProduct({ name, price, stock });
    res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Eliminar un producto (Solo Admin)
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productRepository.deleteProduct(pid);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
