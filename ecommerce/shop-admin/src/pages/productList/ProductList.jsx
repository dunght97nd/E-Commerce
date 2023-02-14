import "./productList.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

const ProductList = () => {
  const [pageSize, setPageSize] = useState(5);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };
  const productColumns = [
    { field: "_id", headerName: "ID", width: 240 },
    {
      field: "product",
      headerName: "Product",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {/* <img className="cellImg" src={params.row.img} alt="" /> */}
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 140,
    },
    { field: "featured", headerName: "featured", width: 140 },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/products/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <div className="listContainer">
        <div className="datatable">
          <div className="datatableTitle">
            Products List
            <Link to="/products/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            getRowId={(row) => row._id}
            rows={products}
            columns={productColumns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            checkboxSelection
            rowHeight={60}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
