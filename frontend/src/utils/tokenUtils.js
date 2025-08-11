// Token utility functions
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

export const getTokenExpiryTime = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch (error) {
    return null;
  }
};

export const getTokenTimeRemaining = (token) => {
  if (!token) return 0;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    const currentTime = Date.now();
    return Math.max(0, expiryTime - currentTime);
  } catch (error) {
    return 0;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('user');
  // Clear any other auth-related data
  sessionStorage.clear();
};

export const redirectToLogin = () => {
  clearAuthData();
  window.location.href = '/login';
};
