export default class TicketRepository {
  constructor(ticketDAO) {
    this.ticketDAO = ticketDAO;
  }

  createTicket(ticketData) {
    return this.ticketDAO.createTicket(ticketData);
  }

  getTicketById(id) {
    return this.ticketDAO.getTicketById(id);
  }

  getAllTickets() {
    return this.ticketDAO.getAllTickets();
  }
}
