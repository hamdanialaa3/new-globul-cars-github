// src/pages/MessagesPage.tsx
// Messages Page Component for Bulgarian Car Marketplace

import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import ChatList from '../components/ChatList';
import ChatInterface from '../components/ChatInterface';
import { ChatRoom } from '../services/realtimeMessaging';

const MessagesPageContainer = styled.div`
  display: flex;
  height: calc(100vh - 80px); // Adjust based on header height
  background: ${({ theme }) => theme.colors.background.default};
  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ChatListWrapper = styled.div`
  flex: 0 0 350px;
  min-width: 300px;
`;

const ChatInterfaceWrapper = styled.div`
  flex: 1;
  min-width: 0; // Allow flex item to shrink below content size
`;

const EmptyChatState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};

  .icon {
    font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    opacity: 0.5;
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin: 0;
    max-width: 400px;
    line-height: 1.6;
  }
`;

const MessagesPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);

  // Mock current user - in real app, get from auth context
  const currentUserId = 'current-user-id';
  const currentUserName = 'Current User';

  const handleChatSelect = (chatRoom: ChatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  const handleCloseChat = () => {
    setSelectedChatRoom(null);
  };

  const getOtherParticipant = (chatRoom: ChatRoom) => {
    const otherUserId = chatRoom.participants.find(p => p !== currentUserId);
    if (!otherUserId) return null;

    return {
      id: otherUserId,
      name: chatRoom.participantNames[otherUserId] || 'Unknown User'
    };
  };

  return (
    <MessagesPageContainer>
      <ChatListWrapper>
        <ChatList
          currentUserId={currentUserId}
          onChatSelect={handleChatSelect}
          selectedChatId={selectedChatRoom?.id}
        />
      </ChatListWrapper>

      <ChatInterfaceWrapper>
        {selectedChatRoom ? (
          (() => {
            const otherParticipant = getOtherParticipant(selectedChatRoom);
            if (!otherParticipant) return null;

            return (
              <ChatInterface
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                otherUserId={otherParticipant.id}
                otherUserName={otherParticipant.name}
                carId={selectedChatRoom.carId}
                carTitle={selectedChatRoom.carTitle}
                onClose={handleCloseChat}
              />
            );
          })()
        ) : (
          <EmptyChatState>
            <div className="icon">💬</div>
            <h2>{t('messages.selectConversation')}</h2>
            <p>{t('messages.selectConversationDesc')}</p>
          </EmptyChatState>
        )}
      </ChatInterfaceWrapper>
    </MessagesPageContainer>
  );
};

export default MessagesPage;