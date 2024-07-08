"use client";

import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  primary?: boolean;
  background?: string;
  color?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  hoverBorder?: string;
  activeBgColor?: string;
  activeBorderColor?: string;
  borderWidth?: string;
  borderColor?: string;
  width?: string;
  hoverBorderWidth?: string; 
  hoverBorderColor?: string; 
}

const BaseButtonStyles = css<ButtonProps>`
  width: ${(props) => props.width || 'auto'};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-bottom: 17px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => props.background || '#4C28BC'};
  border-width: ${(props) => props.borderWidth || '2px'}; 
  border-color: ${(props) => props.borderColor || '#4C28BC'};
  border-style: solid;
  color: ${(props) => props.color || '#fff'};

  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor || props.background};
    color: ${(props) => props.hoverColor || props.color};
    border-width: ${(props) => props.hoverBorderWidth || props.borderWidth || '2px'}; 
    border-color: ${(props) => props.hoverBorderColor || props.borderColor || '#4C28BC'}; 
  }

  &:active {
    background-color: ${(props) => props.activeBgColor || props.background};
    border-color: ${(props) => props.activeBorderColor || props.borderColor};
  }
`;

const PrimaryButtonWrapper = styled.button<ButtonProps>`
  ${BaseButtonStyles}
  /* Additional styles for primary button */
`;

const SecondaryButtonWrapper = styled.button<ButtonProps>`
  ${BaseButtonStyles}
  /* Additional styles for secondary button */
`;

const ButtonText = styled.span`
  color: inherit;
  font-size: 14px; /* Smaller font size */
  font-family: 'Product Sans', sans-serif;
  font-weight: bold; /* Bold text */
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 31px; /* Default icon size */
  margin: 0 8px;
`;

export const PrimaryButton: React.FC<ButtonProps> = ({
  startIcon,
  endIcon,
  primary = true,
  children,
  ...rest
}) => {
  return (
    <PrimaryButtonWrapper {...rest}>
      {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
      <ButtonText>{children}</ButtonText>
      {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
    </PrimaryButtonWrapper>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  startIcon,
  endIcon,
  primary = false,
  children,
  ...rest
}) => {
  return (
    <SecondaryButtonWrapper {...rest}>
      {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
      <ButtonText>{children}</ButtonText>
      {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
    </SecondaryButtonWrapper>
  );
};
