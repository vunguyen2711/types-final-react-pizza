import styled from "styled-components";
export const DeliveryDetailContainer = styled.section`
  padding-top: 40px;
  padding-bottom: 40px;
  .detail__customer,
  .detail__table {
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    border: 2px solid var(--red-color);
    margin-bottom: 20px;
  }
  .detail__customer-category {
    text-align: center;
    font-size: 32px;
    color: var(--red-color);
  }
  .detail__customer-title {
    font-size: 18px;
    color: var(--black-color);
    font-weight: 100;
  }
  .detail__customer-value {
    color: var(--black-color);
  }
  .detail__table {
  }
`;
