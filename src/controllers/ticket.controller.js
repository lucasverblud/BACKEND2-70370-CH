import TicketRepository from "../repositories/ticket.repository.js";
import TicketDAO from "../daos/ticket.dao.js";
import { v4 as uuidv4 } from "uuid";

const ticketRepository = new TicketRepository(new TicketDAO());

export const createTicket = async (req, res) => {
  try {
    const { amount, purchaser } = req.body;

    if (!amount || !purchaser) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newTicket = await ticketRepository.createTicket({
      code: uuidv4(), // Generamos un código único
      amount,
      purchaser,
    });

    res.status(201).json({ message: "Ticket creado con éxito", ticket: newTicket });
  } catch (error) {
    console.error("❌ Error al crear ticket:", error);
    res.status(500).json({ message: "Error al crear el ticket", error });
  }
};
