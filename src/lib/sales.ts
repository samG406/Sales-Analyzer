import axios from 'axios';
import { FilterState, SalesData } from '../types/index';
import { BASE_URL } from './api';


// Filtered data function
export const fetchFilteredData = async (filters: FilterState): Promise<SalesData[]> => {
    try {
        const response = await axios.get<SalesData[]>(`${BASE_URL}/salesData`);
        let data = response.data;
        
        // Apply filters
        if (filters.minAmount) {
            data = data.filter(item => item["Total Amount"] >= Number(filters.minAmount));
        }
        
        if (filters.maxAmount) {
            data = data.filter(item => item["Total Amount"] <= Number(filters.maxAmount));
        }
        
        if (filters.startDate) {
            data = data.filter(item => new Date(item.Date) >= new Date(filters.startDate));
        }
        
        if (filters.endDate) {
            data = data.filter(item => new Date(item.Date) <= new Date(filters.endDate));
        }
        return data;
    } catch (error) {
        console.error('Error fetching filtered data:', error);
        throw error;
    }
};
