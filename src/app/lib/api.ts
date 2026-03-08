import { projectId, publicAnonKey } from '/utils/supabase/info';
import { PortfolioData } from './portfolio-data';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1aee2bae`;

export async function fetchPortfolioData(): Promise<PortfolioData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      // データがまだ保存されていない場合
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error('Failed to save data');
    }
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    throw error;
  }
}
