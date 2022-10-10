import React from "react";
import { Row, Col, List, Avatar } from "antd";
import whyimg from "../../assets/images/location.png";
import * as S from "./style";
const whyData = [
  {
    title: "The Best Service In VietNam",
  },
  {
    title: "100% Guarentee",
  },
  {
    title: "Fast Transportation",
  },
  {
    title: "Freeshipping Cost",
  },
];
const WhySection = () => {
  return (
    <S.WhyContainer>
      <Row gutter={20}>
        <Col xl={12}>
          <div className="why__img">
            <img src={whyimg} alt="" />
          </div>
        </Col>

        <Col
          className="why__list"
          xl={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 className="why__title">
            <span>Why</span> People choose us ???
          </h2>
          <List
            itemLayout="horizontal"
            dataSource={whyData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </S.WhyContainer>
  );
};

export default WhySection;
