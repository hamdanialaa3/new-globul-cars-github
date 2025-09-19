// src/components/ChatInterface.tsx
// Chat Interface Component for Bulgarian Car Marketplace

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { realtimeMessagingService, Message, TypingIndicator } from '../services/realtimeMessaging';

interface ChatInterfaceProps {
  currentUserId: string;
  currentUserName: string;
  otherUserId: string;
  otherUserName: string;
  carId?: string;
  carTitle?: string;
  onClose?: () => void;
  className?: string;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  max-height: 80vh;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.dark};
`;

const ChatTitle = styled.div`
  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  p {
    margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    opacity: 0.9;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey[300]};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.colors.grey[400]};
    }
  }
`;

const MessageBubble = styled.div<{ isOwn: boolean }>`
  align-self: ${({ isOwn }) => isOwn ? 'flex-end' : 'flex-start'};
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme, isOwn }) =>
    isOwn ? theme.colors.primary.main : theme.colors.grey[100]};
  color: ${({ theme, isOwn }) =>
    isOwn ? 'white' : theme.colors.text.primary};
  border-radius: ${({ theme, isOwn }) =>
    isOwn
      ? `${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.sm} ${theme.borderRadius.lg}`
      : `${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.sm}`
  };
  word-wrap: break-word;
  position: relative;

  .message-content {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .message-time {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    opacity: 0.7;
    text-align: ${({ isOwn }) => isOwn ? 'right' : 'left'};
  }

  .message-status {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    margin-top: ${({ theme }) => theme.spacing.xs};
    text-align: ${({ isOwn }) => isOwn ? 'right' : 'left'};
  }
`;

const TypingIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 2px;

  .dot {
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }

  @keyframes typing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const MessageInputContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
  background: ${({ theme }) => theme.colors.background.paper};
`;

const MessageForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-family: inherit;
  resize: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const SendButton = styled.button<{ disabled: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey[300] : theme.colors.primary.main};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey[600] : 'white'};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    opacity: 0.5;
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin: 0;
  }
`;

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUserId,
  currentUserName,
  otherUserId,
  otherUserName,
  carId,
  carTitle,
  onClose,
  className
}) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const chatMessages = await realtimeMessagingService.getMessages(
          currentUserId,
          otherUserId
        );
        setMessages(chatMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
  }, [currentUserId, otherUserId]);

  // Listen to new messages
  useEffect(() => {
    const unsubscribe = realtimeMessagingService.listenToMessages(
      currentUserId,
      (newMessages) => {
        // Filter messages for this conversation
        const conversationMessages = newMessages.filter(
          msg => (msg.senderId === otherUserId && msg.receiverId === currentUserId) ||
                 (msg.senderId === currentUserId && msg.receiverId === otherUserId)
        );
        setMessages(conversationMessages);
      }
    );

    return () => unsubscribe();
  }, [currentUserId, otherUserId]);

  // Listen to typing indicators
  useEffect(() => {
    const unsubscribe = realtimeMessagingService.listenToTypingIndicators(
      currentUserId,
      (indicators) => {
        const relevantIndicators = indicators.filter(
          indicator => indicator.userId === otherUserId
        );
        setTypingUsers(relevantIndicators);
      }
    );

    return () => unsubscribe();
  }, [currentUserId, otherUserId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      await realtimeMessagingService.sendMessage({
        senderId: currentUserId,
        senderName: currentUserName,
        receiverId: otherUserId,
        receiverName: otherUserName,
        carId,
        carTitle,
        content: newMessage.trim(),
        messageType: 'text',
        isRead: false
      });

      setNewMessage('');
      setIsTyping(false);

      // Stop typing indicator
      await realtimeMessagingService.sendTypingIndicator(
        currentUserId,
        otherUserId,
        false
      );
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    // Send typing indicator
    const shouldBeTyping = value.trim().length > 0;
    if (shouldBeTyping !== isTyping) {
      setIsTyping(shouldBeTyping);
      await realtimeMessagingService.sendTypingIndicator(
        currentUserId,
        otherUserId,
        shouldBeTyping
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bg-BG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isTypingIndicator = typingUsers.some(user => user.isTyping);

  return (
    <ChatContainer className={className}>
      <ChatHeader>
        <ChatTitle>
          <h3>{otherUserName}</h3>
          {carTitle && <p>{t('messages.aboutCar')}: {carTitle}</p>}
        </ChatTitle>
        {onClose && (
          <CloseButton onClick={onClose} aria-label={t('common.close')}>
            ×
          </CloseButton>
        )}
      </ChatHeader>

      <MessagesContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <div className="icon">💬</div>
            <h3>{t('messages.noMessages')}</h3>
            <p>{t('messages.startConversation')}</p>
          </EmptyState>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} isOwn={message.senderId === currentUserId}>
                <div className="message-content">{message.content}</div>
                <div className="message-time">
                  {formatTime(message.createdAt)}
                </div>
                {message.senderId === currentUserId && (
                  <div className="message-status">
                    {message.isRead ? t('messages.read') : t('messages.sent')}
                  </div>
                )}
              </MessageBubble>
            ))}

            {isTypingIndicator && (
              <TypingIndicatorContainer>
                <TypingDots>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </TypingDots>
                <span>{otherUserName} {t('messages.isTyping')}</span>
              </TypingIndicatorContainer>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </MessagesContainer>

      <MessageInputContainer>
        <MessageForm onSubmit={handleSendMessage}>
          <MessageInput
            ref={inputRef}
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={t('messages.typeMessage')}
            rows={1}
          />
          <SendButton
            type="submit"
            disabled={!newMessage.trim()}
          >
            {t('messages.send')}
          </SendButton>
        </MessageForm>
      </MessageInputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;