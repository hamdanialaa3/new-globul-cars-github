// src/components/Footer.tsx
// Footer Component for Bulgarian Car Marketplace

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';

// Styled Components
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.grey[900]};
  color: ${({ theme }) => theme.colors.grey[100]};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.grey[300]};
    text-decoration: none;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.light};
    }
  }
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.grey[300]};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.grey[800]};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.grey[300]};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.grey[800]};
  padding-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.grey[500]};
`;

const Copyright = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  a {
    color: ${({ theme }) => theme.colors.grey[500]};
    text-decoration: none;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.light};
    }
  }
`;

const BulgarianFlag = styled.div`
  width: 20px;
  height: 15px;
  background: linear-gradient(to bottom,
    ${({ theme }) => theme.colors.primary.main} 33%,
    white 33% 66%,
    ${({ theme }) => theme.colors.secondary.main} 66%
  );
  border-radius: 2px;
  display: inline-block;
  margin-right: ${({ theme }) => theme.spacing.xs};
  vertical-align: middle;
`;

// Footer Component
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Company Info */}
          <FooterSection>
            <h3>🚗 Globul Cars</h3>
            <p>
              {t('footer.description')}
            </p>
            <SocialLinks>
              <SocialLink href="https://facebook.com/globulcars" target="_blank" rel="noopener noreferrer">
                📘
              </SocialLink>
              <SocialLink href="https://instagram.com/globulcars" target="_blank" rel="noopener noreferrer">
                📷
              </SocialLink>
              <SocialLink href="https://twitter.com/globulcars" target="_blank" rel="noopener noreferrer">
                🐦
              </SocialLink>
              <SocialLink href="https://linkedin.com/company/globulcars" target="_blank" rel="noopener noreferrer">
                💼
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection>
            <h3>{t('footer.quickLinks')}</h3>
            <ul>
              <li><FooterLink to="/">{t('nav.home')}</FooterLink></li>
              <li><FooterLink to="/cars">{t('nav.cars')}</FooterLink></li>
              <li><FooterLink to="/sell">{t('nav.sell')}</FooterLink></li>
              <li><FooterLink to="/about">{t('nav.about')}</FooterLink></li>
              <li><FooterLink to="/contact">{t('nav.contact')}</FooterLink></li>
            </ul>
          </FooterSection>

          {/* Services */}
          <FooterSection>
            <h3>{t('footer.services')}</h3>
            <ul>
              <li><FooterLink to="/services/car-valuation">{t('footer.carValuation')}</FooterLink></li>
              <li><FooterLink to="/services/financing">{t('footer.financing')}</FooterLink></li>
              <li><FooterLink to="/services/insurance">{t('footer.insurance')}</FooterLink></li>
              <li><FooterLink to="/services/maintenance">{t('footer.maintenance')}</FooterLink></li>
              <li><FooterLink to="/services/trade-in">{t('footer.tradeIn')}</FooterLink></li>
            </ul>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection>
            <h3>{t('footer.contact')}</h3>
            <ul>
              <li>
                <strong>{t('footer.phone')}:</strong><br />
                +359 2 123 4567
              </li>
              <li>
                <strong>{t('footer.email')}:</strong><br />
                info@globulcars.bg
              </li>
              <li>
                <strong>{t('footer.address')}:</strong><br />
                ул. Витоша 1<br />
                София 1000, България
              </li>
              <li>
                <strong>{t('footer.workingHours')}:</strong><br />
                Пн-Пт: 9:00-18:00<br />
                Сб: 10:00-16:00
              </li>
            </ul>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            <BulgarianFlag />
            © {currentYear} Globul Cars. {t('footer.copyright')}
          </Copyright>
          <FooterLinks>
            <a href="/privacy">{t('footer.privacy')}</a>
            <a href="/terms">{t('footer.terms')}</a>
            <a href="/cookies">{t('footer.cookies')}</a>
            <a href="/sitemap">{t('footer.sitemap')}</a>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;