import styled from "styled-components";

export const TestimonialContainer = styled.div`
  .testimonial__img {
    width: 100%;
    & img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .testimonial__subtitle {
    color: var(--red-color);
    font-size: 32px;
  }
  .testimonial__title {
    color: var(--black-color);
    font-size: 32px;
    & span {
      color: var(--red-color);
    }
  }
`;
