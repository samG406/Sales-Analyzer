import axios from 'axios';
import { FilterState, SalesData } from '../types/index';
import { BASE_URL } from './api';


// Filtered data function (Server-side filtering)
export const fetchFilteredData = async (filters: FilterState): Promise<SalesData[]> => {
    try {
        // Build query string for server-side filtering
        const params = new URLSearchParams();
        if (filters.minAmount) params.append('minAmount', filters.minAmount.toString());
        if (filters.maxAmount) params.append('maxAmount', filters.maxAmount.toString());
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        
        // Use server-side filtering endpoint
        const response = await axios.get<SalesData[]>(`${BASE_URL}/api/salesData/filtered?${params}`);
        return response.data; // Only filtered records from server
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        throw error;
    }
};
