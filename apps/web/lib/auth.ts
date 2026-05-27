"use client";

// Simple base64 decoding for frontend JWT extraction
export function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('epstopik_token');
  if (!token) return null;
  
  const payload = decodeJwt(token);
  if (!payload) return null;
  
  // Check if token is expired
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('epstopik_token');
    return null;
  }
  
  return payload;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('epstopik_token');
    window.location.href = '/';
  }
}
