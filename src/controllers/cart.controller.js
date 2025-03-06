import CartRepository from "../repositories/cart.repository.js";
import CartDAO from "../daos/cart.dao.js";
import TicketRepository from "../repositories/ticket.repository.js";
import TicketDAO from "../daos/ticket.dao.js";
import { v4 as uuidv4 } from "uuid";

const cartRepository = new CartRepository(new CartDAO());
const ticketRepository = new TicketRepository(new TicketDAO());

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const userEmail = req.user.email;

    const purchaseResult = await cartRepository.purchaseCart(cid, userEmail);

    if (purchaseResult.error) {
      return res.status(400).json({ message: purchaseResult.error });
    }

    // Crear el ticket si hubo productos comprados
    if (purchaseResult.success) {
      const newTicket = await ticketRepository.createTicket({
        code: uuidv4(),
        amount: purchaseResult.ticketData.amount,
        purchaser: purchaseResult.ticketData.purchaser,
      });

      // Filtrar productos no comprados y actualizar el carrito
      const updatedCart = await cartRepository.updateCart(cid, {
        products: purchaseResult.remainingProducts,
      });

      return res.status(200).json({
        message: "Compra realizada con éxito",
        ticket: newTicket,
        remainingProducts: updatedCart.products,
      });
    }

    return res.status(400).json({ message: "No hay stock suficiente para la compra", remainingProducts: purchaseResult.remainingProducts });

  } catch (error) {
    res.status(500).json({ message: "Error al procesar la compra", error });
  }
};
