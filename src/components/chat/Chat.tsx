import React, { useState } from 'react'
import styles from '@/styles/chat/Chat.module.scss'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import AddCommentIcon from '@mui/icons-material/AddComment';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useAppSelector } from '@/app/hooks';
import { db } from '@/firebase';
import { addDoc, collection, CollectionReference, DocumentData, serverTimestamp } from 'firebase/firestore';
import useSubCollection from '@/hooks/useSubCollection';

function Chat() {

  const [inputText, setInputText] = useState<string>("");

  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const { subDocuments: messages } = useSubCollection("channels", "messages");

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const documents: CollectionReference<DocumentData> 
      = collection(db, "channels", String(channelId), "messages");
    
    await addDoc(documents, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  };

  return (
    <div className={styles.chat}>
        <ChatHeader channelName={channelName}/>
        <div className={styles.chatMessage}>
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          ))}
        </div>
        <div className={styles.chatInput}>
          <AddCommentIcon/>
          <form>
            <input 
              type="text"
              placeholder='#Udemyへメッセージを送信' 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
              value={inputText}
            />
            <button type='submit' className={styles.chatInputButton} 
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
              送信
            </button>
          </form>
          <div className={styles.chatInputIcons}>
            <CardGiftcardIcon />
            <GifIcon />
            <EmojiEmotionsIcon />
          </div>
        </div>
    </div>
  )
}

export default Chat