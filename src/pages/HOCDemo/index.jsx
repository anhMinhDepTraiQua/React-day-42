import React, { useState } from "react";
import UserProfile from "./components/UserProfile";
import ProductList from "./components/ProductList";

export default function HOCDemo() {
  const [userLoading, setUserLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  return (
    <div>
      <h2>HOC Demo</h2>

      <button onClick={() => setUserLoading((prev) => !prev)}>
        Toggle User Loading
      </button>

      <button onClick={() => setProductLoading((prev) => !prev)}>
        Toggle Product Loading
      </button>

      <hr />

      <UserProfile isLoading={userLoading} />
      <ProductList isLoading={productLoading} />
    </div>
  );
}
