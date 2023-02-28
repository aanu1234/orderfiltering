import "./orders.css";
import { useState } from "react";
import { useSelector } from "react-redux";

// components
import OrderTable from "../../components/table/OrderTable";
import Pagination from "../../components/pagination/Pagination";
import Content from "../../components/Content";

// ------------------------------------------------------

const Orders = ({ toggleDrawer }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, totalProducts } = useSelector((state) => state.orders);

  const indexOfLastProducts = currentPage * 20;
  const indexOfFirstProducts = indexOfLastProducts - 20;
  const currentProducts = products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentProducts && currentProducts.length > 0 ? (
        <div className="home">
          <div className="homeContainer">
            <div className="listContainer">
              <div className="listTitle">Order Items</div>
              <OrderTable products={currentProducts} />
              <Pagination
                productsPerPage={20}
                totalProducts={totalProducts}
                paginate={handlePaginate}
              />
            </div>
          </div>
        </div>
      ) : (
        <Content toggleDrawer={toggleDrawer} />
      )}
    </>
  );
};

export default Orders;
