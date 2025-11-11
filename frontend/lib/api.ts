// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to get full API URL
export const getApiUrl = (path: string) => {
  // If path starts with /, use it as is, otherwise add /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In development, use rewrites (relative path)
  // In production, use full URL
  if (process.env.NODE_ENV === 'development') {
    return `/api${normalizedPath}`;
  }
  
  // In production, use the full API URL
  return `${API_URL}/api${normalizedPath}`;
};

