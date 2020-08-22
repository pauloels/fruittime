import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 50px;
  height: 30px;
  padding: 0 2px;
  background: #fff;
  border-radius: 10px;
  border-width: 2px;
  border-color: #bebebe;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;

  ${props =>
    props.isFocused &&
    css`
      border-color: #fa7d09;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #3c3d47;
  font-size: 16px;
  padding: 4px;
  font-family: 'Roboto-Regular';
`;
