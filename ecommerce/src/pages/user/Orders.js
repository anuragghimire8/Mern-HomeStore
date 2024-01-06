import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) 
    {
      getOrders();
 
   }
     }, [auth?.token]);
     return (
      <Layout title={"Your Orders"}>
        <div className="container-flui p-3 m-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
            {auth?.user?.role !== 1 && (
              <h1 className="text-center">All Orders</h1>
            )}
              {orders?.map((o, i) => (
                <div className="border shadow" key={i}>
                {auth?.user?.role !== 1 && (
                  <table className="table">

                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>
                          {moment(o?.createAt).format("MMMM Do YYYY, h:mm:ss a")}
                        </td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      </tr>
                    </tbody>
                  </table>
                  )}
                  {auth?.user?.role !== 1 && (
                    <>
                      <div className="container">
                        {o?.products?.map((p, j) => (
                          <div
                            className="row mb-2 p-3 card flex-row"
                            key={p._id}
                          >
                            <div className="col-md-4">
                              <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                width="18rem"
                                height={"200px"}
                              />
                            </div>
                            <div className="col-md-8">
                              <p>{p.name}</p>
                              <p>{p.description.substring(0, 30)}</p>
                              <p>Price: {p.price}</p>
                              <p>Quantity: {p.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default Orders;