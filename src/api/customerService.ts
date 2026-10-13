import { CustomerLead, LeadStatus, ApiResponse } from '../types';
import { MOCK_LEADS } from '../constants';
import { axiosClient } from './axiosClient';
import { ENDPOINTS } from './endpoints';

let leadsCache = [...MOCK_LEADS];

export const customerService = {
  async getLeads(): Promise<CustomerLead[]> {
    try {
      const response = await axiosClient.get<any, any>(
        ENDPOINTS.CUSTOMERS.LEADS
      );
      const raw = response?.data !== undefined ? response.data : response;
      if (Array.isArray(raw)) return raw.length > 0 ? raw : [...leadsCache];
      if (raw && Array.isArray(raw.items)) return raw.items.length > 0 ? raw.items : [...leadsCache];
      if (Array.isArray(response)) return response.length > 0 ? response : [...leadsCache];
    } catch {
      // Fallback to cache if offline
    }
    return [...leadsCache];
  },

  async updateLeadStatus(id: string, status: LeadStatus): Promise<CustomerLead> {
    try {
      const response = await axiosClient.patch<any, ApiResponse<CustomerLead>>(
        `${ENDPOINTS.CUSTOMERS.LEADS}/${id}`,
        { status }
      );
      if (response?.data) return response.data;
    } catch {
      // Fallback
    }
    const lead = leadsCache.find((l) => l.id === id);
    if (!lead) throw new Error('Customer lead not found');
    lead.status = status;
    return { ...lead };
  },

  async addLead(leadData: Omit<CustomerLead, 'id' | 'createdAt'>): Promise<CustomerLead> {
    try {
      const response = await axiosClient.post<any, ApiResponse<CustomerLead>>(
        ENDPOINTS.CUSTOMERS.LEADS,
        leadData
      );
      if (response?.data) return response.data;
    } catch {
      // Fallback
    }
    const newLead: CustomerLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    leadsCache = [newLead, ...leadsCache];
    return newLead;
  },
};
