import React, { useEffect, useState, ChangeEvent } from "react";
import { minPriceValue, maxPriceValue } from "../../constants/constants";
import _ from "lodash";
import CommonSection from "../../components/CommonSection/CommonSection";
import Helmet from "../../layouts/Helmet/Helmet";

import ProductCard from "../../components/ProductCard/ProductCard";

import {
  fetchSearchFoods,
  getFetchedFoods,
  ParamsFetchFoods,
} from "../../redux/features/LoadFood/loadFoodSlice";

import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  Input,
  Row,
  Col,
  Checkbox,
  Slider,
  Select,
  Button,
  Spin,
  Tag,
} from "antd";
import * as S from "./style";

const { Option } = Select;
const SearchFoods: React.FC = () => {
  const dispatch = useAppDispatch();
  const { foods, status, total } = useAppSelector(getFetchedFoods);
  const [tags, setTags] = useState([]);
  const [filterParams, setFilterParams] = useState<ParamsFetchFoods>({
    category: [],
    limit: 8,
    keySearch: "",
    rangePrice: [],
    sortBy: "auto",
  });

  const updateFilter = (field: string, value: any) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        limit: ["category", "keySearch", "rangePrice", "sortBy"].includes(field)
          ? 8
          : prev.limit,
        [field]: value,
      };
    });
  };
  const handleKeySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const debounceKeySearch = _.debounce(
      () => updateFilter("keySearch", e.target.value),
      1000
    );
    debounceKeySearch();
  };

  const handleLoadmore = () => {
    setFilterParams((prev) => {
      return {
        ...prev,
        limit: prev.limit + 8,
      };
    });
  };
  const optionsCheckbox = [
    { label: "Combo", value: "Combo" },
    { label: "Pizza", value: "Pizza" },
    { label: "Noodle", value: "Noodle" },
    { label: "Salad", value: "Salad" },
    { label: "Drink", value: "Drink" },
    { label: "Cream", value: "Cream" },
  ];

  useEffect(() => {
    dispatch(fetchSearchFoods(filterParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams]);

  return (
    <>
      <Helmet title="Search Foods"></Helmet>
      <CommonSection title="Search Foods"></CommonSection>
      <S.SearchFoodsContainer>
        <Row gutter={16}>
          <Col xl={6} xs={24}>
            <div className="search__filter">
              <div className="search__filter-input">
                <h2>Search here: </h2>
                <Input
                  onChange={(e) => handleKeySearch(e)}
                  placeholder="enter your food name..."
                  name="keySearch"
                ></Input>
              </div>
              <div className="search__filter-checkbox">
                <h2>Category: </h2>
                <Checkbox.Group
                  options={optionsCheckbox}
                  onChange={(e) => updateFilter("category", e)}
                  name="category"
                />
              </div>
              <div className="search__filter-range">
                <h2>Price Range: </h2>
                <Slider
                  min={0}
                  max={300}
                  range
                  step={10}
                  defaultValue={[minPriceValue, maxPriceValue]}
                  onAfterChange={(e) => updateFilter("rangePrice", e)}
                />
              </div>
              <div className="search__filter-select">
                <h2>Sort by :</h2>
                <Select
                  defaultValue="auto"
                  style={{ width: 120 }}
                  onChange={(e) => updateFilter("sortBy", e)}
                >
                  <Option value="auto">Auto</Option>
                  <Option value="asc">Low Price</Option>
                  <Option value="desc">Hight Price</Option>
                </Select>
              </div>
            </div>
          </Col>
          <Col xl={18} xs={24}>
            <div className="search__filter-tags"></div>
            <div className="search__filter-total">
              <h1>
                Total: {status === "loading" ? <Spin /> : <span>{total} </span>}
                Products
              </h1>
            </div>
            <div className="search__showcase">
              <Row gutter={10}>
                {foods.map((item, index) => (
                  <Col key={item.id} xl={6} lg={12} xs={24}>
                    <ProductCard item={item} />
                  </Col>
                ))}
                <Col span={24}>
                  <div className="loadmore__button">
                    {filterParams.limit < total && (
                      <Button onClick={() => handleLoadmore()} block>
                        {status === "loading" ? <LoadingOutlined /> : "+ "}
                        Load More
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </S.SearchFoodsContainer>
    </>
  );
};

export default SearchFoods;
