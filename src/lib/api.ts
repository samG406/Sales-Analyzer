import axios from 'axios';
import type { 
  SalesData, 
  LineChartData, 
  BarChartData, 
  PieChartData, 
  AgeDistributionData,
  FilterState,
} from '../types/index';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://json-server-ms3r.onrender.com";

// Fetch all sales data
export const fetchAllSalesData = async (): Promise<SalesData[]> => {
    try {
        const response = await axios.get<SalesData[]>(`${BASE_URL}/salesData`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sales data:', error);
        throw error;
    }
};

// Line Chart API - Sales over time
export const fetchLineChartData = async (): Promise<LineChartData[]> => {
    try {
        const response = await axios.get<SalesData[]>(`${BASE_URL}/salesData`);
        const data = response.data;
        
        // Group data by date and sum total amounts
        const groupedData = data.reduce((acc: Record<string, LineChartData>, item: SalesData) => {
            const date = item.Date;
            if (!acc[date]) {
                acc[date] = { date, totalAmount: 0, transactionCount: 0 };
            }
            acc[date].totalAmount += item["Total Amount"];
            acc[date].transactionCount += 1;
            return acc;
        }, {});
        
        // Convert to array and sort by date
        return Object.values(groupedData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error('Error fetching line chart data:', error);
        throw error;
    }
};

// Bar Chart API - Sales by Product Category
export const fetchBarChartData = async (filters?: FilterState): Promise<BarChartData[]> => {
    try {
        const response = await axios.get<SalesData[]>(`${BASE_URL}/salesData`);
        const data = response.data;
        let filtered = data;

        if (filters?.minAmount) {
            filtered = filtered.filter((item: SalesData) => item["Total Amount"] >= Number(filters.minAmount));
        }
        if (filters?.maxAmount) {
            filtered = filtered.filter((item: SalesData) => item["Total Amount"] <= Number(filters.maxAmount));
        }
        if (filters?.startDate) {
            filtered = filtered.filter((item: SalesData) => new Date(item.Date) >= new Date(filters.startDate));
        }
        if (filters?.endDate) {
            filtered = filtered.filter((item: SalesData) => new Date(item.Date) <= new Date(filters.endDate));
        }
        
        // Group data by product category
        const categoryData = filtered.reduce((acc: Record<string, BarChartData>, item: SalesData) => {
            const category = item["Product Category"];
            if (!acc[category]) {
                acc[category] = { category, totalAmount: 0, quantity: 0 };
            }
            acc[category].totalAmount += item["Total Amount"];
            acc[category].quantity += item.Quantity;
            return acc;
        }, {});
        
        return Object.values(categoryData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        throw error;
    }
};

// Pie Chart API - Sales by Gender
export const fetchPieChartData = async (filters?: FilterState): Promise<PieChartData[]> => {
    try {
        const response = await axios.get<SalesData[]>(`${BASE_URL}/salesData`);
        const data = response.data;
        let filtered = data;

        if (filters?.minAmount) {
            filtered = filtered.filter((item: SalesData) => item["Total Amount"] >= Number(filters.minAmount));              
        }

        if (filters?.maxAmount) {
            filtered = filtered.filter((item: SalesData) => item["Total Amount"] <= Number (filters.maxAmount));
        }
        if (filters?.startDate) {
            filtered = filtered.filter((item: SalesData) => new Date(item.Date) >= new Date(filters.startDate));
        }
        if (filters?.endDate) {
            filtered = filtered.filter((item: SalesData) => new Date(item.Date) <= new Date(filters.endDate));
        }

        
        // Group data by product category
    const productData = filtered.reduce((acc: Record<string, PieChartData>, item: SalesData) => {
            const product = item["Product Category"];
            if (!acc[product]) {
                acc[product] = { name: product, value: 0, count: 0 };
            }
            acc[product].value += item["Total Amount"];
            acc[product].count += 1;
            return acc;
        }, {});
        
        return Object.values(productData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        throw error;
    }
};

// Age Distribution API - for additional charts
export const fetchAgeDistributionData = async (): Promise<AgeDistributionData[]> => {
    try {
        const response = await axios.get<SalesData[]>(`${BASE_URL}/salesData`);
        const data = response.data;
        
        // Create age groups
        const ageGroups: Record<string, AgeDistributionData> = {
            '18-25': { ageGroup: '18-25', count: 0, totalAmount: 0 },
            '26-35': { ageGroup: '26-35', count: 0, totalAmount: 0 },
            '36-45': { ageGroup: '36-45', count: 0, totalAmount: 0 },
            '46-55': { ageGroup: '46-55', count: 0, totalAmount: 0 },
            '56+': { ageGroup: '56+', count: 0, totalAmount: 0 }
        };
        
        data.forEach((item: SalesData) => {
            const age = item.Age;
            let group: string;
            if (age >= 18 && age <= 25) group = '18-25';
            else if (age >= 26 && age <= 35) group = '26-35';
            else if (age >= 36 && age <= 45) group = '36-45';
            else if (age >= 46 && age <= 55) group = '46-55';
            else group = '56+';
            
            ageGroups[group].count += 1;
            ageGroups[group].totalAmount += item["Total Amount"];
        });
        
        return Object.values(ageGroups);
    } catch (error) {
        console.error('Error fetching age distribution data:', error);
        throw error;
    }
};

export { BASE_URL };