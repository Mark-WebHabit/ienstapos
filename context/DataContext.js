import React, { createContext, useContext, useState, useEffect } from "react";
import LoadingModal from "../components/LoadingModal";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { get, onValue, ref } from "firebase/database";

export const DataContext = createContext();

const SYSTEM_PIN = "102030";
const DINING_FEE = 20;
const TAX = 0.04;

const DataContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [user, setUser] = useState(null); // State to store authenticated user
  const [refresh, setRefresh] = useState(0);
  const [date, setDate] = useState(new Date());

  // datas
  const [categories, setCatgories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [madeOrders, setMadeOrders] = useState([]);
  const [dateBasedOrders, setDateBasedOrders] = useState([]);
  // const [keyValueCateg, setkeyValueCateg] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Listener to handle authentication state changes
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          const data = userSnapshot.val();

          setUser(data);
        } else {
          setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up function to unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []); // Run effect only once on component mount

  useEffect(() => {
    const productRef = ref(db, "products");
    const unsubscribe = onValue(productRef, (snapshot) => {
      if (snapshot.exists) {
        const arr = [];
        snapshot.forEach((data) => {
          const obj = { ...data.val(), id: data.key };
          arr.push(obj);
        });
        setProducts(arr);
      } else {
        setProducts([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [refresh]);

  useEffect(() => {
    // Get the current date (local time zone)
    const currentDateISO = date.toISOString().split("T")[0];

    // Create a reference to the orders node
    const ordersRef = ref(db, "orders");

    // Listen for changes to the orders
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const orders = snapshot.val();

        // Transform orders to include the uid
        const todayOrders = Object.entries(orders)
          .filter(([uid, order]) => {
            const orderDate = new Date(order.stamp);
            const orderDateISO = orderDate.toISOString().split("T")[0];
            return orderDateISO === currentDateISO;
          })
          .map(([uid, order]) => {
            const orderWithUid = { ...order, id: uid };
            return orderWithUid;
          });

        setMadeOrders(todayOrders);
      } else {
        setMadeOrders([]);
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Get the current date (local time zone)
    const currentDateISO = date.toISOString().split("T")[0];

    // Create a reference to the orders node
    const ordersRef = ref(db, "orders");

    // Listen for changes to the orders
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const orders = snapshot.val();

        // Transform orders to include the uid
        const todayOrders = Object.entries(orders)
          .filter(([uid, order]) => {
            const orderDate = new Date(order.stamp);
            const orderDateISO = orderDate.toISOString().split("T")[0];
            return orderDateISO === currentDateISO;
          })
          .map(([uid, order]) => {
            const orderWithUid = { ...order, id: uid };
            return orderWithUid;
          });

        setDateBasedOrders(todayOrders);
      } else {
        setDateBasedOrders([]);
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [date]);

  useEffect(() => {
    const categoriesRef = ref(db, "categories");
    const unsubscribe = onValue(categoriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const arr = ["All"];
        const data = snapshot.val();
        const keys = Object.keys(data);

        keys.forEach((key) => {
          const categ = data[key];

          arr.push(categ);
        });

        setCatgories(arr);
      } else {
        setCatgories(["All"]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        SYSTEM_PIN,
        loading,
        setLoading,
        error,
        setError,
        info,
        setInfo,
        user,
        products,
        categories,
        setRefresh,
        DINING_FEE,
        TAX,
        sales,
        setSales,
        madeOrders,
        setMadeOrders,
        date,
        setDate,
        dateBasedOrders,
        setDateBasedOrders,
      }}
    >
      {children}
      <LoadingModal visible={loading} />
      <ErrorModal
        visible={!!error}
        onClose={() => setError(null)}
        message={error}
      />

      <SuccessModal
        visible={!!info}
        onClose={() => setInfo(null)}
        message={info}
      />
    </DataContext.Provider>
  );
};

export default DataContextProvider;
