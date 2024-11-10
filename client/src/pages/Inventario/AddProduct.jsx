import React from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Form from "@/components/Form";
function AddProduct() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1">
        <Header />
        <div>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
