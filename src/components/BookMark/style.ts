import styled from "styled-components";
interface BookMarkProps {
  isFavorite: boolean;
}
export const BookMarkConTent = styled.div`
  display: flex;
  gap: 10px;
  & svg {
    color: ${(p: BookMarkProps) => p.isFavorite && `var(--red-color)`};
  }
  h1 {
    font-size: 16px;
    width: 100x;
  }
`;
