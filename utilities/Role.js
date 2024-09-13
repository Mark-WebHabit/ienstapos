import { ref, set } from "firebase/database";
import { db } from "../firebase";

export const uploadAdminUSerToDatabase = async (
  uid,
  email,
  username,
  isAdmin = true
) => {
  try {
    const userRef = ref(db, `users/${uid}`);

    await set(userRef, {
      role: isAdmin ? "idAdmin" : "cashier",
      username: username,
      email: email,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadRequestCashierToDatabase = async (uid) => {
  try {
    const userRef = ref(db, `users/${uid}`);

    await set(userRef, {
      role: "cashier",
      status: "pending",
    });
  } catch (error) {
    throw new Error(error);
  }
};
