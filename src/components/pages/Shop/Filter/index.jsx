import "./style.scss";
import {Col, Form, Input, Row, Select} from "antd";
import AntButton from "../../../common/Button/index.jsx";
import {FilterOutlined, SearchOutlined, SortAscendingOutlined} from "@ant-design/icons";
import {useState} from "react";

const Filter = () => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("Newest to lowest");
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
        >
          <Select.Option value="men">Men</Select.Option>
          <Select.Option value="women">Women</Select.Option>
          <Select.Option value="best-seller">Best Seller</Select.Option>
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