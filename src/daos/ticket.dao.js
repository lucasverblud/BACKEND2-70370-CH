import ticketModel from "./models/ticket.model.js";

export default class TicketDAO {
  async createTicket(ticketData) {
    return await ticketModel.create(ticketData);
  }

  async getTicketById(id) {
    return await ticketModel.findById(id);
  }

  async getAllTickets() {
    return await ticketModel.find().sort({ purchase_datetime: -1 }); // 🔹 Ordena por fecha (últimos primeros)
  }
}
