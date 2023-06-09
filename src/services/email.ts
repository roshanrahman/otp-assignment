export const postOTPRequest = async (email: string): Promise<void> => {
  // Dummy API
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
  });
  return await response.json();
};
