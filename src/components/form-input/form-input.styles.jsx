import styled, { css } from 'styled-components';

const subColor = css`
  color: grey;
`;
const mainColor = css`
  color: black;
`;

const shrinkLabel = css`
  top: -14px;
  font-size: 12px;
  ${mainColor}
`;

const getLabelStyles = props => {
  if (props.value.length) {
    return shrinkLabel;
  }
};

export const FormContainer = styled.div`
  position: relative;
  margin: 45px 0;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  ${subColor}
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid grey;
  margin: 25px 0;

  &:focus {
    outline: none;
  }
`;

export const FormInputLabelContainer = styled.label`
  color: $sub-color;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &:focus {
    ${shrinkLabel}
  }

  ${getLabelStyles}
`;
