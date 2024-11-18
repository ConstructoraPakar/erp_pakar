/**
 * Guarda el token en el almacenamiento local.
 * @param {string} token - Token JWT.
 */
export function setToken(token) {
    localStorage.setItem('token', token);
  }
  
  /**
   * Obtiene el token del almacenamiento local.
   * @returns {string|null} Token JWT o null si no existe.
   */
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  /**
   * Elimina el token del almacenamiento local.
   */
  export function removeToken() {
    localStorage.removeItem('token');
  }
  