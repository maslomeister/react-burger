export const baseUrl = "/react-burger";

export const urls = {
  home: baseUrl,
  ingredientInfo: `${baseUrl}/ingredients/:id`,
  feed: `${baseUrl}/feed`,
  feedOrder: `${baseUrl}/feed/:id`,
  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  forgotPassword: `${baseUrl}/forgot-password`,
  resetPassword: `${baseUrl}/reset-password`,
  profile: `${baseUrl}/profile`,
  profileOrders: `${baseUrl}/profile/orders`,
  profileOrder: `${baseUrl}/profile/orders/:id`,
  logout: `${baseUrl}/logout`,
};
