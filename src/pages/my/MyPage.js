import React, { useEffect, useState } from "react";
import MyOrderListPage from "./MyOrderListPage";
import MyOrderStatePage from "./MyOrderStatePage";
import MyInterestPage from "./MyInterestPage";
import MyInfoPage from "./MyInfoPage";
import MyWithdrawPage from "./MyWithdrawPage";
import styled from "@emotion/styled";
import MyCategory from "../../components/my/MyCategory";
import { useNavigate } from "react-router-dom";

const AllWidth = styled.div`
  width: 1300px;
  margin: 0 auto;
`;
const Flex = styled.div`
  display: flex;
  margin-bottom: 9rem;
  > div:nth-of-type(2) {
    width: 1090px;
    margin-left: 35px;
    display: flex;
    flex-direction: column;
    gap: 3.3rem;
  }
`;
const MyTitle = styled.div`
  width: 1300px;
  padding: 20px 40px;
  border-bottom: 1px solid #572a01;
  h1 {
    color: #000;
    font-family: "Noto Sans";
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState("주문 내역");
  const [selectedItem, setSelectedItem] = useState("주문 내역");
  const myCate = [
    {
      title: "마이페이지",
      name: ["orderList", "orderState", "interest", "info", "withdraw"],
      list: [
        "주문 내역",
        "주문 현황",
        "관심 매장",
        "내 정보 수정",
        "회원 탈퇴",
      ],
    },
  ];
  // MyCate 상태 변경
  useEffect(() => {
    const storedItem = sessionStorage.getItem("selectedItem");
    if (storedItem && storedItem !== selectedItem) {
      setSelectedItem(storedItem);
      setActiveBtn(storedItem);
    } else {
      const params = new URLSearchParams(location.search);
      const item = params.get("item") || selectedItem;
      setSelectedItem(item);
      setActiveBtn(item);
    }
  }, [location.search, selectedItem]);

  const handleSubItemClick = subItem => {
    setSelectedItem(subItem);
    setActiveBtn(subItem);
    const selectedCategory = myCate.find(category =>
      category.list.includes(subItem),
    );

    if (selectedCategory) {
      const selectedName = selectedCategory.name.find(name => {
        return (
          (name === "orderList" && subItem === "주문 내역") ||
          (name === "orderState" && subItem === "주문 현황") ||
          (name === "interest" && subItem === "관심 매장") ||
          (name === "info" && subItem === "내 정보 수정") ||
          (name === "withdraw" && subItem === "회원 탈퇴")
        );
      });

      if (selectedName) {
        navigate(`/my?${selectedName}`, {
          state: { selectedItem: subItem },
        });
        sessionStorage.setItem("selectedItem", subItem);
      }
    }
  };

  return (
    <AllWidth>
      <div>
        <MyTitle>
          <h1>마이페이지</h1>
        </MyTitle>
        <Flex>
          <MyCategory
            myCate={myCate}
            selectedItem={selectedItem}
            onSubItemClick={handleSubItemClick}
          />
          <div style={{paddingTop:"30px"}}>
            {activeBtn === "주문 내역" && <MyOrderListPage />}
            {activeBtn === "주문 현황" && <MyOrderStatePage />}
            {activeBtn === "관심 매장" && <MyInterestPage />}
            {activeBtn === "내 정보 수정" && <MyInfoPage />}
            {activeBtn === "회원 탈퇴" && <MyWithdrawPage />}
          </div>
        </Flex>
      </div>
    </AllWidth>
  );
};

export default MyPage;
