import "./style.scss";
import {Col, Form, Input, Row, Select} from "antd";
import AntButton from "../../../common/Button/index.jsx";
import {FilterOutlined, SearchOutlined, SortAscendingOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getCategory} from "../../../../services/shop.service.js";

const Filter = ({input, setInput, category, setCategory}) => {
  const [sort, setSort] = useState("Newest to lowest");
  const [selectCategory, setSelectCategory] = useState();

  useEffect(() => {
    try {
      getCategory().then((res) => {
        if (res?.status === 200) {
          setSelectCategory(res?.data?.data?.items);
        }
        else {
          setSelectCategory([]);
        }
      })
    } catch (e) {
      console.log(e);
    }
  }, [])


  return (
    <Row gutter={16} className="filter-container" justify="space-between">
      {/*Filter: by category, by price, by , search*/}
      <Col style={{display: "flex"}}>
        <Input value={input} placeholder="Search" size={"large"} onChange={(e) => setInput(e.target.value)}
               style={{marginRight: 10}}/>
        <Select
          placeholder="Category"
          size={"large"}
          style={{marginRight: 10}}
          onChange={(value) => setCategory(value)}
          options={selectCategory?.map((item) => ({label: item?.name, value: item?.name}))}
        >
        </Select>
        <AntButton text={"Search"} icon={<SearchOutlined/>} size={"large"} style={{marginRight: 10}}/>
        <AntButton
          text={"Clear filter"}
          theme={'light'}
          size={"large"}
          onClick={() => {
            setInput("");
            setCategory("");
            setSort("Newest to lowest");
          }}
        />
      </Col>
      <Col>
        <Select
          placeholder={<span><FilterOutlined/> Sort By: {sort}</span>}
          size={"large"}
          value={<span><FilterOutlined/>{sort}</span>}
          onChange={(value) => setSort(value)}
        >
          <Select.Option value="Price: High to low">Price: High to low</Select.Option>
          <Select.Option value="Price: Low to high">Price: Low to high</Select.Option>
          <Select.Option value="Newest to oldest">Newest to oldest</Select.Option>
          <Select.Option value="Oldest to newest">Oldest to newest</Select.Option>
        </Select>
      </Col>
    </Row>
  )
}

export default Filter;