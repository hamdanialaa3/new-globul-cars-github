// src/components/FullThemeDemo.tsx
// Comprehensive demo of the enhanced yellow-black theme

import React, { useState } from 'react';
import styled from 'styled-components';

const DemoContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
`;

const DemoSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const ColorCard = styled.div<{ bgColor: string; textColor: string }>`
  background: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 2px solid ${({ theme }) => theme.colors.yellow.bright};
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const TestInput = styled.input`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const TestTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const InteractiveCard = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
`;

const FullThemeDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colors');

  return (
    <DemoContainer>
      <h1>🎨 Enhanced Yellow-Black Theme Demo</h1>
      
      <nav style={{ marginBottom: '2rem' }}>
        <button 
          className={activeTab === 'colors' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('colors')}
        >
          Colors
        </button>
        <button 
          className={activeTab === 'buttons' ? 'btn-secondary' : 'btn-outline'}
          onClick={() => setActiveTab('buttons')}
          style={{ marginLeft: '1rem' }}
        >
          Buttons
        </button>
        <button 
          className={activeTab === 'forms' ? 'btn-accent' : 'btn-outline'}
          onClick={() => setActiveTab('forms')}
          style={{ marginLeft: '1rem' }}
        >
          Forms
        </button>
        <button 
          className={activeTab === 'effects' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('effects')}
          style={{ marginLeft: '1rem' }}
        >
          Effects
        </button>
      </nav>

      {activeTab === 'colors' && (
        <DemoSection className="card">
          <h2>🌈 Enhanced Color Palette</h2>
          <ColorGrid>
            <ColorCard bgColor="#FFD700" textColor="#000000">
              Bright Yellow<br/>#FFD700
            </ColorCard>
            <ColorCard bgColor="#FFA500" textColor="#000000">
              Orange Yellow<br/>#FFA500
            </ColorCard>
            <ColorCard bgColor="#FFAE42" textColor="#000000">
              Reddish Yellow<br/>#FFAE42
            </ColorCard>
            <ColorCard bgColor="#ADFF2F" textColor="#000000">
              Greenish Yellow<br/>#ADFF2F
            </ColorCard>
            <ColorCard bgColor="#F0E68C" textColor="#000000">
              Bluish Yellow<br/>#F0E68C
            </ColorCard>
            <ColorCard bgColor="#B8860B" textColor="#FFFFFF">
              Dark Yellow<br/>#B8860B
            </ColorCard>
          </ColorGrid>
        </DemoSection>
      )}

      {activeTab === 'buttons' && (
        <DemoSection className="card">
          <h2>🔘 Enhanced Button Collection</h2>
          <ButtonGrid>
            <button className="btn-primary">Primary Button<br/>Reddish Primary</button>
            <button className="btn-secondary">Secondary Button<br/>Greenish Secondary</button>
            <button className="btn-accent">Accent Button<br/>Bluish Accent</button>
            <button className="btn-outline">Outline Button</button>
          </ButtonGrid>
          <p>All buttons contain gradient lighting and fade effects</p>
        </DemoSection>
      )}

      {activeTab === 'forms' && (
        <DemoSection className="card">
          <h2>📝 Enhanced Form Elements</h2>
          <TestInput 
            type="text" 
            placeholder="Type here to test input field"
          />
          <TestTextarea 
            placeholder="Type here to test textarea"
          />
          <select style={{ width: '100%', margin: '1rem 0' }}>
            <option>Choose an option</option>
            <option>First Option</option>
            <option>Second Option</option>
          </select>
        </DemoSection>
      )}

      {activeTab === 'effects' && (
        <DemoSection className="card">
          <h2>✨ Visual Effects</h2>
          <InteractiveCard className="card">
            <h3>Interactive Card</h3>
            <p>Hover over this card to see fade and lighting effects</p>
          </InteractiveCard>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Background Effects:</h3>
            <ul>
              <li>✅ Multi-layer color gradient on background</li>
              <li>✅ Gradual fade effect when loading page</li>
              <li>✅ Animated lighting on elements</li>
              <li>✅ Reflection effects on buttons</li>
              <li>✅ Dynamic shadows for texts</li>
              <li>✅ Smooth transitions between states</li>
            </ul>
          </div>
        </DemoSection>
      )}

      <DemoSection className="card">
        <h2>📊 Theme Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div>
            <h4>🎯 Main Features:</h4>
            <ul>
              <li>Background image: carpic.jpg</li>
              <li>Varied yellow color gradients</li>
              <li>High contrast for readability</li>
              <li>Advanced visual effects</li>
            </ul>
          </div>
          <div>
            <h4>🌈 Yellow Shades:</h4>
            <ul>
              <li>Light Yellow (#FFFF99)</li>
              <li>Dark Yellow (#B8860B)</li>
              <li>Reddish Yellow (#FFAE42)</li>
              <li>Greenish Yellow (#ADFF2F)</li>
              <li>Bluish Yellow (#F0E68C)</li>
            </ul>
          </div>
        </div>
      </DemoSection>
    </DemoContainer>
  );
};

export default FullThemeDemo;