import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const isAuthenticated = () => {
  const token = Cookies.get('auth_token');
  if (!token) return false;

  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken) return false;

    // Verificar si el token ha expirado
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      Cookies.remove('auth_token');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return false;
  }
};

export const logout = () => {
  Cookies.remove('auth_token');
};