import "./orders.css";
// import * as api from "../../api";
import { useState } from "react";
import { useSelector } from "react-redux";

// components
// import Backdrop from "../../components/backdrop";
import OrderTable from "../../components/table/OrderTable";
import Pagination from "../../components/pagination/Pagination";

// reducers
// import { FETCH_ALL } from "../../reducers/constants";
import Content from "../../components/Content";

// ------------------------------------------------------

const Orders = ({ toggleDrawer }) => {
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { products, totalProducts } = useSelector((state) => state.orders);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.getOrders();
  //     dispatch({ type: FETCH_ALL, payload: data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const indexOfLastProducts = currentPage * 20;
  const indexOfFirstProducts = indexOfLastProducts - 20;
  const currentProducts = products.slice(
    indexOfFirstProducts,
    indexOfLastProducts
  );

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  // if (loading) return <Backdrop loading />;

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
