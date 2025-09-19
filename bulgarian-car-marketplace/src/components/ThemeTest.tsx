// src/components/ThemeTest.tsx
// Component to test the new yellow-black theme

import React from 'react';
import styled from 'styled-components';

const ThemeTestContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const ColorSwatch = styled.div<{ color: string; bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  display: inline-block;
  min-width: 200px;
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ButtonTest = styled.button<{ variant?: 'primary' | 'secondary' | 'accent' }>`
  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.primary.main :
    variant === 'secondary' ? theme.colors.secondary.main :
    theme.colors.accent.main};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  border: 2px solid ${({ theme }) => theme.colors.primary.dark};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CardTest = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.md} 0;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const AlertTest = styled.div<{ type: 'success' | 'warning' | 'error' | 'info' }>`
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme, type }) =>
    type === 'success' ? theme.colors.success.main :
    type === 'warning' ? theme.colors.warning.main :
    type === 'error' ? theme.colors.error.main :
    theme.colors.info.main};
  background-color: ${({ theme, type }) =>
    type === 'success' ? 'rgba(154, 205, 50, 0.9)' :
    type === 'warning' ? 'rgba(255, 215, 0, 0.9)' :
    type === 'error' ? 'rgba(220, 20, 60, 0.9)' :
    'rgba(0, 206, 209, 0.9)'};
  color: ${({ theme, type }) =>
    type === 'error' ? theme.colors.error.contrastText :
    theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ThemeTest: React.FC = () => {
  return (
    <ThemeTestContainer>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Theme Test - Yellow-Black Theme
      </h1>

      <CardTest>
        <h2>Color Palette</h2>
        <div>
          <ColorSwatch bgColor="#FFD700" color="#000000">Bright Yellow</ColorSwatch>
          <ColorSwatch bgColor="#FFA500" color="#000000">Orange Yellow</ColorSwatch>
          <ColorSwatch bgColor="#FFFF00" color="#000000">Pure Yellow</ColorSwatch>
          <ColorSwatch bgColor="#B8860B" color="#FFFFFF">Dark Yellow</ColorSwatch>
          <ColorSwatch bgColor="#000000" color="#FFFFFF">Black</ColorSwatch>
        </div>
      </CardTest>

      <CardTest>
        <h2>Button Tests</h2>
        <div>
          <ButtonTest variant="primary">Primary Button</ButtonTest>
          <ButtonTest variant="secondary">Secondary Button</ButtonTest>
          <ButtonTest variant="accent">Accent Button</ButtonTest>
        </div>
      </CardTest>

      <CardTest>
        <h2>Alert Messages</h2>
        <AlertTest type="success">Success Message</AlertTest>
        <AlertTest type="warning">Warning Message</AlertTest>
        <AlertTest type="error">Error Message</AlertTest>
        <AlertTest type="info">Info Message</AlertTest>
      </CardTest>

      <CardTest>
        <h2>Background Image</h2>
        <p>
          The car image should appear as background with blur and transparency effects.
        </p>
      </CardTest>
    </ThemeTestContainer>
  );
};

export default ThemeTest;