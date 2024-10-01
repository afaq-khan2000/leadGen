import axios from "./axios";
// send

class Routes {
  // change password - api handler
  async getAllLeads(page, offset) {
    const response = await axios.get(`/leads?page=${page}&offset=${offset}`);
    return response;
  }

  async getStats() {
    const response = await axios.get(`/leads/stats`);
    return response;
  }

  async unlockLead(id) {
    const response = await axios.post(`/leads/unlock/${id}`);
    return response;
  }

  async getUnlockedLeads() {
    const response = await axios.get(`/leads/unlocked_leads`);
    return response;
  }
}

export default new Routes();
