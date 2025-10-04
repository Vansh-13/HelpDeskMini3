import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => ({
  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
});

export const createTicket = (data) => axios.post(`${API_URL}/tickets`, data, getAuthHeaders());
export const getTickets = (params) => axios.get(`${API_URL}/tickets`, { params, ...getAuthHeaders() });
export const getTicket = (id) => axios.get(`${API_URL}/tickets/${id}`, getAuthHeaders());
export const updateTicket = (id, data) => axios.patch(`${API_URL}/tickets/${id}`, data, getAuthHeaders());
export const addComment = (ticketId, message) => axios.post(`${API_URL}/tickets/${ticketId}/comments`, { message }, getAuthHeaders());
