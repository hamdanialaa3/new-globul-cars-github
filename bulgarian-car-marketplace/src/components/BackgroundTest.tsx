// src/components/BackgroundTest.tsx
// Component to test the background image functionality

import React from 'react';
import styled from 'styled-components';

const BackgroundTestContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TestCard = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 3px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  max-width: 600px;
  width: 100%;

  h1, h2, p {
    color: ${({ theme }) => theme.colors.text.primary};
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const BackgroundTest: React.FC = () => {
  return (
    <BackgroundTestContainer>
      <TestCard>
        <h1>Background Image Test</h1>
        <h2>Background Image Test</h2>
        <p>
          If you can see this text clearly with the car image in the background,
          then the design is working correctly!
        </p>
        <p>
          If you can see this text clearly with the car image in the background,
          then the design is working correctly!
        </p>
        <p>
          Path: /media/images/backgrounds/carpic.jpg
          <br />
          Path: /media/images/backgrounds/carpic.jpg
        </p>
      </TestCard>
    </BackgroundTestContainer>
  );
};

export default BackgroundTest;