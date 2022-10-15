import React, { useEffect, useState } from "react";
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
import { Input, Row, Col, Checkbox, Slider, Select, Button, Spin } from "antd";
import * as S from "./style";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { SliderValue, ValueSelect } from "../../interfaces/interface";
const { Option } = Select;
const SearchFoods: React.FC = () => {
  const dispatch = useAppDispatch();
  const { foods, status, total } = useAppSelector(getFetchedFoods);
  console.log(total);
  const [filterParams, setFilterParams] = useState<ParamsFetchFoods>({
    category: null,
    limit: 8,
    keysearch: null,
    rangePrice: null,
    sortBy: "asc",
  });
  const [loadmore, setLoadmore] = useState<boolean>(true);

  const onAfterSliderChange = (value: SliderValue) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        rangePrice: value,
      };
    });
  };
  const onCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        category: checkedValues,
      };
    });
  };
  const handleKeySearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        keysearch: value.target.value,
      };
    });
  };
  const handleSelectChange = (value: ValueSelect) => {
    console.log(value);
    setFilterParams((prev) => {
      return {
        ...prev,
        sortBy: value,
      };
    });
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
    setFilterParams((prev) => {
      return {
        ...prev,
        limit: 8,
      };
    });
    if (filterParams.limit >= total) {
      setLoadmore(false);
    } else {
      setLoadmore(true);
    }
  }, [
    filterParams.category,
    filterParams.keysearch,
    filterParams.rangePrice,
    filterParams.sortBy,
  ]);
  useEffect(() => {
    dispatch(fetchSearchFoods(filterParams));
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
                ></Input>
              </div>
              <div className="search__filter-checkbox">
                <h2>Category: </h2>
                <Checkbox.Group
                  options={optionsCheckbox}
                  onChange={onCheckboxChange}
                />
              </div>
              <div className="search__filter-range">
                <h2>Price Range: </h2>
                <Slider
                  min={0}
                  max={300}
                  range
                  step={10}
                  defaultValue={[20, 50]}
                  onAfterChange={onAfterSliderChange}
                />
              </div>
              <div className="search__filter-select">
                <h2>Sort by :</h2>
                <Select
                  defaultValue="asc"
                  style={{ width: 120 }}
                  onChange={handleSelectChange}
                >
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
                Total: <span></span>
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
                    {loadmore && (
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
