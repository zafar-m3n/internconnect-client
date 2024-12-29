export const formatCB = (email) => {
  if (!email) return "";
  return email.split("@")[0];
};
