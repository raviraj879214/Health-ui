export const fixTypos = (text) => {
  if (!text) return text;

  return text.replace(/\bCordinator\b/g, "Coordinator");
};