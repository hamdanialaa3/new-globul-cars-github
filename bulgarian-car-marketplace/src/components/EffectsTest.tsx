// src/components/EffectsTest.tsx
// Component to test the lighting and fade effects

import React from 'react';
import styled from 'styled-components';

const EffectsContainer = styled.div`
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

const EffectCard = styled.div`
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 240, 0.98) 50%,
    rgba(255, 255, 255, 0.96) 100%
  );
  backdrop-filter: blur(15px);
  border: 3px solid ${({ theme }) => theme.colors.yellow.bright};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2), ${({ theme }) => theme.shadows.lg};
  max-width: 600px;
  width: 100%;
  transition: all 0.4s ease-in-out;
  animation: cardFadeIn 1s ease-out;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 35px rgba(255, 215, 0, 0.3), ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.yellow.golden};
  }

  @keyframes cardFadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const GlowButton = styled.button`
  background: linear-gradient(135deg,
    ${({ theme }) => theme.colors.yellow.bright} 0%,
    ${({ theme }) => theme.colors.yellow.golden} 50%,
    ${({ theme }) => theme.colors.yellow.orangeYellow} 100%
  );
  color: ${({ theme }) => theme.colors.text.primary};
  border: 2px solid ${({ theme }) => theme.colors.yellow.dark};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.sm};
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
  animation: buttonGlow 2s ease-in-out infinite alternate;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: linear-gradient(135deg,
      ${({ theme }) => theme.colors.yellow.golden} 0%,
      ${({ theme }) => theme.colors.yellow.dark} 50%,
      ${({ theme }) => theme.colors.yellow.mustard} 100%
    );
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
    border-color: ${({ theme }) => theme.colors.yellow.dark};
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
  }

  @keyframes buttonGlow {
    0% {
      box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }
    100% {
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.6);
    }
  }
`;

const EffectsTest: React.FC = () => {
  return (
    <EffectsContainer>
      <EffectCard>
        <h1 style={{
          color: '#000000',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3), 1px 1px 2px rgba(255,255,255,0.5)',
          animation: 'textShimmer 4s ease-in-out infinite'
        }}>
          🎨 Visual Effects Test
        </h1>
        <h2 style={{
          color: '#000000',
          textShadow: '1px 1px 2px rgba(255,255,255,0.3)',
          marginBottom: '1rem'
        }}>
          Visual Effects Test
        </h2>

        <p style={{
          color: '#000000',
          textShadow: '1px 1px 2px rgba(255,255,255,0.3)',
          marginBottom: '2rem'
        }}>
          If you see these effects, the design is working correctly:
        </p>

        <div>
          <GlowButton>Glowing Button</GlowButton>
          <GlowButton>Another Button</GlowButton>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#000000', marginBottom: '1rem' }}>
            ✅ Applied Effects:
          </h3>
          <ul style={{ textAlign: 'left', color: '#000000' }}>
            <li>Multi-layer gradient background</li>
            <li>Progressive fade effect on page load</li>
            <li>Animated lighting on buttons</li>
            <li>Light reflection effects</li>
            <li>Dynamic text shadows</li>
            <li>Card interactions on hover</li>
            <li>Shimmer effect on headings</li>
          </ul>
        </div>
      </EffectCard>
    </EffectsContainer>
  );
};

export default EffectsTest;