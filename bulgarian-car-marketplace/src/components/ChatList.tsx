// src/components/ChatList.tsx
// Chat List Component for Bulgarian Car Marketplace

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { realtimeMessagingService, ChatRoom } from '../services/realtimeMessaging';

interface ChatListProps {
  currentUserId: string;
  onChatSelect: (chatRoom: ChatRoom) => void;
  selectedChatId?: string;
  className?: string;
}

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  overflow: hidden;
`;

const ChatListHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary.dark};

  h2 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const ChatListContent = styled.div`
  flex: 1;
  overflow-y: auto;

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

const ChatItem = styled.div<{ isSelected: boolean; hasUnread: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary.light + '20' : 'transparent'};
  border-left: 4px solid ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary.main : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.grey[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ChatItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ChatPartnerName = styled.div<{ hasUnread: boolean }>`
  font-weight: ${({ theme, hasUnread }) =>
    hasUnread ? theme.typography.fontWeight.bold : theme.typography.fontWeight.normal};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ChatTime = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ChatPreview = styled.div<{ hasUnread: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme, hasUnread }) =>
    hasUnread ? theme.colors.text.primary : theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CarTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const UnreadBadge = styled.div`
  background: ${({ theme }) => theme.colors.error.main};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
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

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${({ theme }) => theme.colors.text.secondary};

  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid ${({ theme }) => theme.colors.grey[300]};
    border-top: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ChatList: React.FC<ChatListProps> = ({
  currentUserId,
  onChatSelect,
  selectedChatId,
  className
}) => {
  const { t } = useTranslation();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  // Load chat rooms
  useEffect(() => {
    const loadChatRooms = async () => {
      try {
        setLoading(true);
        const rooms = await realtimeMessagingService.getUserChatRooms(currentUserId);
        setChatRooms(rooms);
      } catch (error) {
        console.error('Failed to load chat rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChatRooms();
  }, [currentUserId]);

  // Listen to chat room updates
  useEffect(() => {
    const unsubscribe = realtimeMessagingService.listenToChatRooms(
      currentUserId,
      (updatedRooms) => {
        setChatRooms(updatedRooms);
      }
    );

    return () => unsubscribe();
  }, [currentUserId]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('bg-BG', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('bg-BG', {
        weekday: 'short'
      });
    } else {
      return date.toLocaleDateString('bg-BG', {
        day: '2-digit',
        month: '2-digit'
      });
    }
  };

  const getLastMessagePreview = (lastMessage: any) => {
    if (!lastMessage) return t('chat.noMessages');

    const content = lastMessage.content || '';
    const maxLength = 50;
    return content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content;
  };

  const getUnreadCount = (chatRoom: ChatRoom) => {
    return chatRoom.unreadCount[currentUserId] || 0;
  };

  if (loading) {
    return (
      <ChatListContainer className={className}>
        <ChatListHeader>
          <h2>{t('messages.conversations')}</h2>
        </ChatListHeader>
        <LoadingState>
          <div className="spinner"></div>
        </LoadingState>
      </ChatListContainer>
    );
  }

  return (
    <ChatListContainer className={className}>
      <ChatListHeader>
        <h2>{t('chat.conversations')}</h2>
      </ChatListHeader>

      <ChatListContent>
        {chatRooms.length === 0 ? (
          <EmptyState>
            <div className="icon">💬</div>
            <h3>{t('messages.noConversations')}</h3>
            <p>{t('messages.startChatting')}</p>
          </EmptyState>
        ) : (
          chatRooms.map((chatRoom) => {
            const unreadCount = getUnreadCount(chatRoom);
            const hasUnread = unreadCount > 0;
            const isSelected = chatRoom.id === selectedChatId;

            return (
              <ChatItem
                key={chatRoom.id}
                isSelected={isSelected}
                hasUnread={hasUnread}
                onClick={() => onChatSelect(chatRoom)}
              >
                <ChatItemHeader>
                  <ChatPartnerName hasUnread={hasUnread}>
                    {chatRoom.participants.find(p => p !== currentUserId) ?
                      chatRoom.participantNames[chatRoom.participants.find(p => p !== currentUserId)!] :
                      t('messages.unknownUser')}
                  </ChatPartnerName>
                  <ChatTime>
                    {chatRoom.lastMessage ? formatTime(chatRoom.lastMessage.createdAt) : ''}
                  </ChatTime>
                </ChatItemHeader>

                {chatRoom.carTitle && (
                  <CarTitle>{chatRoom.carTitle}</CarTitle>
                )}

                <ChatPreview hasUnread={hasUnread}>
                  {getLastMessagePreview(chatRoom.lastMessage)}
                </ChatPreview>

                {hasUnread && (
                  <UnreadBadge>{unreadCount}</UnreadBadge>
                )}
              </ChatItem>
            );
          })
        )}
      </ChatListContent>
    </ChatListContainer>
  );
};

export default ChatList;