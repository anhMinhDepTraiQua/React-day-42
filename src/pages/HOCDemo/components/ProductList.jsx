import React from "react";
import withLoading from "@/hoc/withLoading";

function ProductList() {
  const products = ["Laptop", "Điện thoại", "Máy tính bảng"];

  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {products.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default withLoading(ProductList);
