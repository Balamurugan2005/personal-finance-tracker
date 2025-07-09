const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/api/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return await res.json();
};

export const createTransaction = async (data) => {
  const res = await fetch(`${BASE_URL}/api/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create transaction");
  return await res.json();
};

export const updateTransaction = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/transactions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update transaction");
  return await res.json();
};

export const deleteTransaction = async (id) => {
  const res = await fetch(`${BASE_URL}/api/transactions/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete transaction");
  return await res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
};
