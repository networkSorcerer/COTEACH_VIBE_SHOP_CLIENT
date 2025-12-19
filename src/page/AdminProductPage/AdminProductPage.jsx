import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchBox from "../../common/component/SearchBox";
import NewItemDialog from "./component/NewItemDialog";
import ProductTable from "./component/ProductTable";
import {
  getProductList,
  deleteProduct,
  setSelectedProduct,
} from "../../features/product/productSlice";

import "./style/adminProduct.style.css"


const AdminProductPage = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const dispatch = useDispatch();

  const { productList, totalPageNum } = useSelector(
    (state) => state.product
  );

  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState("new");

  const [searchQuery, setSearchQuery] = useState({
    page: Number(query.get("page")) || 1,
    name: query.get("name") || "",
  });

  const tableHeader = [
    "#",
    "Sku",
    "Name",
    "Price",
    "Stock",
    "Image",
    "Status",
    "",
  ];

  // 상품 리스트 불러오기
  useEffect(() => {
    dispatch(getProductList({ ...searchQuery }));
  }, [query]);

  // URL 쿼리 동기화
  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    if (!searchQuery.name) params.delete("name");
    navigate("?" + params.toString());
  }, [searchQuery]);

  const deleteItem = (id) => {
    dispatch(deleteProduct(id));
  };

  const openEditForm = (product) => {
    setMode("edit");
    dispatch(setSelectedProduct(product));
    setShowDialog(true);
  };

  const handleClickNewItem = () => {
    setMode("new");
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  return (
    <div className="locate-center">
      <Container>
        <div className="mt-2">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="제품 이름으로 검색"
            field="name"
          />
        </div>

        <Button
          variant="dark"
          className="mt-2 mb-2"
          onClick={handleClickNewItem}
        >
          Add New Item +
        </Button>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
        />

        {/* ✅ 페이지네이션 */}
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          breakLabel="..."
          pageCount={totalPageNum}
          onPageChange={handlePageClick}
          forcePage={searchQuery.page - 1}
          pageRangeDisplayed={5}          // ⭐ 5개씩 표시
          marginPagesDisplayed={5}        // ⭐ 필수
          containerClassName="pagination justify-content-center mt-4"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </Container>

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};

export default AdminProductPage;
