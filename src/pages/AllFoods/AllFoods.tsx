import React, { useEffect, useState } from "react";
import CommonSection from "../../components/CommonSection/CommonSection";
import Helmet from "../../layouts/Helmet/Helmet";
import { Input, Row, Col, Space, Spin, Button } from "antd";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  ArrowRightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import * as S from "./style";
import Slider from "react-slick";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import type {
  LoadMore,
  Loading,
  FetchData,
  OptionState,
} from "../../interfaces/interface";
import axios from "axios";
import { RoutesPath } from "../../constants/routes.path";

var settings = {
  dots: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  autoplay: true,
  className: "allfood__slider",
  autoplaySpeed: 2,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const AllFoods: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loadMore, setLoadMore] = useState<LoadMore>({
    pizzas: false,
    appetizers: false,
    noodles: false,
    salads: false,
    drinks: false,
    creams: false,
  });
  const [loading, setLoading] = useState<Loading>({
    comboLoading: true,
    pizzaLoading: true,
    appetizersLoading: true,
    noodlesLoading: true,
    saladsLoading: true,
    drinksLoading: true,
    creamsLoading: true,
  });

  //Combo
  const [combos, setCombos] = useState<FetchData[]>([]);
  //Pizza
  const [pizzas, setPizzas] = useState<FetchData[]>([]);
  const [optionFetchPizza, setOptionFetchPizza] = useState<OptionState>({
    type: null,
    limit: 4,
  });
  //Appetizers
  const [appetizers, setAppetizers] = useState<FetchData[]>([]);

  const [optionFetchAppetizers, setOptionFetchAppetizers] =
    useState<OptionState>({
      limit: 4,
    });
  //Noodles
  const [noodles, setNoodles] = useState<FetchData[]>([]);
  const [optionFetchNoodles, setOptionFetchNoodles] = useState<OptionState>({
    limit: 4,
  });
  //Salads
  const [salads, setSalads] = useState<FetchData[]>([]);
  const [optionFetchSalads, setOptionFetchSalads] = useState<OptionState>({
    limit: 4,
  });
  //Drinks
  const [drinks, setDrinks] = useState<FetchData[]>([]);
  const [optionFetchDrinks, setOptionFetchDrinks] = useState<OptionState>({
    limit: 4,
  });
  //Drinks
  const [creams, setCreams] = useState<FetchData[]>([]);
  const [optionFetchCreams, setOptionFetchCreams] = useState<OptionState>({
    limit: 4,
  });
  // function
  const handleLoadMorePizza = () => {
    setLoadMore((prev) => {
      return {
        ...prev,
        pizzas: true,
      };
    });
    setOptionFetchPizza((prev) => {
      return {
        ...prev,
        limit: prev.limit + 4,
      };
    });
  };
  const handleLoadMoreAppetizers = () => {
    setLoadMore((prev) => {
      return {
        ...prev,
        appetizers: true,
      };
    });
    setOptionFetchAppetizers((prev) => {
      return {
        ...prev,
        limit: prev.limit + 4,
      };
    });
  };
  const handleLoadMoreNoodles = () => {
    setLoadMore((prev) => {
      return {
        ...prev,
        noodles: true,
      };
    });
    setOptionFetchNoodles((prev) => {
      return {
        ...prev,
        limit: prev.limit + 4,
      };
    });
  };
  const handleLoadMoreSalads = () => {
    setLoadMore((prev) => {
      return {
        ...prev,
        salads: true,
      };
    });
    setOptionFetchSalads((prev) => {
      return {
        ...prev,
        limit: prev.limit + 4,
      };
    });
  };
  const handleLoadMoreDrinks = () => {
    setLoadMore((prev) => {
      return {
        ...prev,
        drinks: true,
      };
    });
    setOptionFetchDrinks((prev) => {
      return {
        ...prev,
        limit: prev.limit + 4,
      };
    });
  };
  const handleLoadMoreCreams = () => {
    setLoadMore((prev) => {
      return {
        ...prev,
        creams: true,
      };
    });
    setOptionFetchCreams((prev) => {
      return {
        ...prev,
        limit: prev.limit + 4,
      };
    });
  };
  // useEffect
  const PRODUCTS_URL: string = "http://localhost:8800/products";
  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await axios.get(`${PRODUCTS_URL}?category=Combo`);
        setCombos(res.data);
        setLoading((prev) => {
          return {
            ...prev,
            comboLoading: false,
          };
        });
      } catch (error) {}
    };
    fetchCombos();
  }, []);
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await axios.get(
          `${PRODUCTS_URL}?category=Pizza&_limit=${optionFetchPizza.limit}&${
            optionFetchPizza.type !== null && `type=${optionFetchPizza.type}`
          }`
        );
        setLoading((prev) => {
          return {
            ...prev,
            pizzaLoading: false,
          };
        });
        setLoadMore((prev) => {
          return {
            ...prev,
            pizzas: false,
          };
        });
        if (optionFetchPizza.limit >= Number(res.headers["x-total-count"])) {
          setLoadMore((prev) => {
            return {
              ...prev,
              pizzas: null,
            };
          });
        }
        setPizzas(res.data);
      } catch (error) {}
    };
    fetchPizzas();
  }, [optionFetchPizza]);
  useEffect(() => {
    const fetchAppertizers = async () => {
      try {
        const res = await axios.get(
          `${PRODUCTS_URL}?category=Appetizer&_limit=${optionFetchAppetizers.limit}`
        );
        setLoading((prev) => {
          return {
            ...prev,
            appetizersLoading: false,
          };
        });
        setLoadMore((prev) => {
          return {
            ...prev,
            appetizers: false,
          };
        });
        if (
          optionFetchAppetizers.limit >= Number(res.headers["x-total-count"])
        ) {
          setLoadMore((prev) => {
            return {
              ...prev,
              appetizers: null,
            };
          });
        }
        setAppetizers(res.data);
      } catch (error) {}
    };
    fetchAppertizers();
  }, [optionFetchAppetizers]);
  useEffect(() => {
    const fetchNoodles = async () => {
      try {
        const res = await axios.get(
          `${PRODUCTS_URL}?category=Noodle&_limit=${optionFetchNoodles.limit}`
        );
        setLoading((prev) => {
          return {
            ...prev,
            noodlesLoading: false,
          };
        });
        setLoadMore((prev) => {
          return {
            ...prev,
            noodles: false,
          };
        });
        if (optionFetchNoodles.limit >= Number(res.headers["x-total-count"])) {
          setLoadMore((prev) => {
            return {
              ...prev,
              noodles: null,
            };
          });
        }
        setNoodles(res.data);
      } catch (error) {}
    };
    fetchNoodles();
  }, [optionFetchNoodles]);
  useEffect(() => {
    const fetchSalads = async () => {
      try {
        const res = await axios.get(
          `${PRODUCTS_URL}?category=Salad&_limit=${optionFetchSalads.limit}`
        );
        setLoading((prev) => {
          return {
            ...prev,
            saladsLoading: false,
          };
        });
        setLoadMore((prev) => {
          return {
            ...prev,
            salads: false,
          };
        });
        if (optionFetchSalads.limit >= Number(res.headers["x-total-count"])) {
          setLoadMore((prev) => {
            return {
              ...prev,
              salads: null,
            };
          });
        }
        setSalads(res.data);
      } catch (error) {}
    };
    fetchSalads();
  }, [optionFetchSalads]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const res = await axios.get(
          `${PRODUCTS_URL}?category=Drink&_limit=${optionFetchDrinks.limit}`
        );
        setLoading((prev) => {
          return {
            ...prev,
            drinksLoading: false,
          };
        });
        setLoadMore((prev) => {
          return {
            ...prev,
            drinks: false,
          };
        });
        if (optionFetchDrinks.limit >= Number(res.headers["x-total-count"])) {
          setLoadMore((prev) => {
            return {
              ...prev,
              drinks: null,
            };
          });
        }
        setDrinks(res.data);
      } catch (error) {}
    };
    fetchDrinks();
  }, [optionFetchDrinks]);
  useEffect(() => {
    const fetchCreams = async () => {
      try {
        const res = await axios.get(
          `${PRODUCTS_URL}?category=Cream&_limit=${optionFetchCreams.limit}`
        );
        setLoading((prev) => {
          return {
            ...prev,
            creamsLoading: false,
          };
        });
        setLoadMore((prev) => {
          return {
            ...prev,
            creams: false,
          };
        });
        if (optionFetchCreams.limit >= Number(res.headers["x-total-count"])) {
          setLoadMore((prev) => {
            return {
              ...prev,
              creams: null,
            };
          });
        }
        setCreams(res.data);
      } catch (error) {}
    };
    fetchCreams();
  }, [optionFetchCreams]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet title="All Foods" />
      <CommonSection title="All Foods" />
      <S.AllFoodContainer>
        <Row gutter={20}>
          <Col span={24}>
            <Link to={RoutesPath.SEARCHFOODS}>
              <div className="allfoods__search">
                <SearchOutlined className="allfoods__search-icon" />
                <h2 className="allfoods__search-text">Search</h2>
              </div>
            </Link>
          </Col>
          <Col span={24} className="allfood__combo">
            <h2 className="allfood__combo--title">Promotion, Combo</h2>
            {loading.comboLoading ? (
              <div
                style={{
                  width: "100%",

                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <Slider {...settings}>
                {combos?.map((combo, index) => (
                  <ProductCard key={combo.id} item={combo}></ProductCard>
                ))}
              </Slider>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: "350px" }}>
          <Col span={24} className="allfood__title">
            <h2>MENU</h2>
          </Col>
          <Col lg={12} xs={24}>
            <h2 className="allfood__category">Pizza</h2>
          </Col>
          <Col lg={12} xs={24}>
            <div className="pizza__filter">
              <div
                onClick={() => {
                  setOptionFetchPizza((prev) => {
                    return { ...prev, type: null };
                  });
                  setLoading((prev) => {
                    return { ...prev, pizzaLoading: true };
                  });
                }}
                className={`pizza__filter--button ${
                  optionFetchPizza.type === null && `is-actived`
                }`}
              >
                All
              </div>
              <div
                onClick={() => {
                  setLoading((prev) => {
                    return { ...prev, pizzaLoading: true };
                  });
                  setOptionFetchPizza((prev) => {
                    return { ...prev, type: "Special" };
                  });
                }}
                className={`pizza__filter--button ${
                  optionFetchPizza.type === "Special" && `is-actived`
                }`}
              >
                Special
              </div>
              <div
                onClick={() => {
                  setLoading((prev) => {
                    return { ...prev, pizzaLoading: true };
                  });
                  setOptionFetchPizza((prev) => {
                    return { ...prev, type: "SeaFood" };
                  });
                }}
                className={`pizza__filter--button ${
                  optionFetchPizza.type === "SeaFood" && `is-actived`
                }`}
              >
                SeaFood
              </div>
              <div
                onClick={() => {
                  setLoading((prev) => {
                    return { ...prev, pizzaLoading: true };
                  });
                  setOptionFetchPizza((prev) => {
                    return { ...prev, type: "Mixed" };
                  });
                }}
                className="pizza__filter--button"
              >
                Mixed
              </div>
              <div
                onClick={() => {
                  setLoading((prev) => {
                    return { ...prev, pizzaLoading: true };
                  });
                  setOptionFetchPizza((prev) => {
                    return { ...prev, type: "Traditional" };
                  });
                }}
                className={`pizza__filter--button ${
                  optionFetchPizza.type === "Traditional" && `is-actived`
                }`}
              >
                Traditional
              </div>
            </div>
          </Col>
          {loading.pizzaLoading ? (
            <div
              style={{
                width: "100%",

                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            pizzas?.map((item, index) => (
              <Col key={item.id} lg={6} md={12} xs={24}>
                <ProductCard item={item} />
              </Col>
            ))
          )}
          {loadMore.pizzas !== null && (
            <Col span={24}>
              <div>
                <Button
                  onClick={() => handleLoadMorePizza()}
                  className="loadmore__button"
                  block
                >
                  {loadMore.pizzas ? <LoadingOutlined /> : `+`} Load More
                </Button>
              </div>
            </Col>
          )}

          <Col span={24}>
            <h2 className="allfood__category">Appertizers</h2>
          </Col>

          {loading.appetizersLoading ? (
            <div
              style={{
                width: "100%",

                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            appetizers?.map((item, index) => (
              <Col key={item.id} lg={6} md={12} xs={24}>
                <ProductCard item={item} />
              </Col>
            ))
          )}
          {loadMore.appetizers !== null && (
            <Col span={24}>
              <div>
                <Button
                  onClick={() => handleLoadMoreAppetizers()}
                  className="loadmore__button"
                  block
                >
                  {loadMore.appetizers ? <LoadingOutlined /> : `+`} Load More
                </Button>
              </div>
            </Col>
          )}
          <Col span={24}>
            <h2 className="allfood__category">Noodles</h2>
          </Col>

          {loading.noodlesLoading ? (
            <div
              style={{
                width: "100%",

                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            noodles?.map((item, index) => (
              <Col key={item.id} lg={6} md={12} xs={24}>
                <ProductCard item={item} />
              </Col>
            ))
          )}
          {loadMore.noodles !== null && (
            <Col span={24}>
              <div>
                <Button
                  onClick={() => handleLoadMoreNoodles()}
                  className="loadmore__button"
                  block
                >
                  {loadMore.noodles ? <LoadingOutlined /> : `+`} Load More
                </Button>
              </div>
            </Col>
          )}
          <Col span={24}>
            <h2 className="allfood__category">Salads</h2>
          </Col>

          {loading.saladsLoading ? (
            <div
              style={{
                width: "100%",

                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            salads?.map((item, index) => (
              <Col key={item.id} lg={6} md={12} xs={24}>
                <ProductCard item={item} />
              </Col>
            ))
          )}
          {loadMore.salads !== null && (
            <Col span={24}>
              <div>
                <Button
                  onClick={() => handleLoadMoreSalads()}
                  className="loadmore__button"
                  block
                >
                  {loadMore.salads ? <LoadingOutlined /> : `+`} Load More
                </Button>
              </div>
            </Col>
          )}
          <Col span={24}>
            <h2 className="allfood__category">Drinks</h2>
          </Col>

          {loading.drinksLoading ? (
            <div
              style={{
                width: "100%",

                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            drinks?.map((item, index) => (
              <Col key={item.id} lg={6} md={12} xs={24}>
                <ProductCard item={item} />
              </Col>
            ))
          )}
          {loadMore.drinks !== null && (
            <Col span={24}>
              <div>
                <Button
                  onClick={() => handleLoadMoreDrinks()}
                  className="loadmore__button"
                  block
                >
                  {loadMore.drinks ? <LoadingOutlined /> : `+`} Load More
                </Button>
              </div>
            </Col>
          )}
          <Col span={24}>
            <h2 className="allfood__category">Creams</h2>
          </Col>

          {loading.creamsLoading ? (
            <div
              style={{
                width: "100%",

                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            creams?.map((item, index) => (
              <Col key={item.id} lg={6} md={12} xs={24}>
                <ProductCard item={item} />
              </Col>
            ))
          )}
          {loadMore.creams !== null && (
            <Col span={24}>
              <div>
                <Button
                  onClick={() => handleLoadMoreCreams()}
                  className="loadmore__button"
                  block
                >
                  {loadMore.creams ? <LoadingOutlined /> : `+`} Load More
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </S.AllFoodContainer>
    </>
  );
};

export default AllFoods;
