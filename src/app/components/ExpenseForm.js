import React, { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { useAuth } from "./AuthProvider";

const ExpenseForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || isNaN(amount) || amount <= 0) {
      setError("Invalid input values");
      return;
    }
    try {
      if (editing) {
        const expenseDoc = doc(db, "expenses", editing);
        await updateDoc(expenseDoc, { name, amount });
        setEditing(null);
      } else {
        await addDoc(collection(db, "expenses"), {
          name,
          amount,
          userId: user.uid,
        });
      }
      setName("");
      setAmount("");
      fetchExpenses();
    } catch (err) {
      console.error("Error saving expense: ", err);
      setError("Failed to save expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense Name"
        className="border p-2 mr-2"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-600 text-white p-2">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
