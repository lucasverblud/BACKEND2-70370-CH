export default class TicketRepository {
    constructor(ticketDAO) {
      this.ticketDAO = ticketDAO;
    }
  
    async createTicket(ticketData) {
      return await this.ticketDAO.createTicket(ticketData);
    }
  
    async getTicketById(id) {
      return await this.ticketDAO.getTicketById(id);
    }
  
    async getAllTickets() {
      return await this.ticketDAO.getAllTickets();
    }
  }
  