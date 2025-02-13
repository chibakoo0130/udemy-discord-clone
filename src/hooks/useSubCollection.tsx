import { useAppSelector } from '@/app/hooks';
import { db } from '@/firebase';
import { collection, DocumentData, onSnapshot, orderBy, Query, query, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react'

interface Message {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  }
}

const useSubCollection = (collectionName: string, subCollectionName: string) => {

  const channelId = useAppSelector((state) => state.channel.channelId);
  const [subDocuments, setSubDocuments] = useState<Message[]>([]);

  const collectionRef = collection(db, collectionName, String(channelId), subCollectionName);
  const timestampSortedCollectionRef: Query<DocumentData, DocumentData> = query(collectionRef, orderBy("timestamp", "desc"));

  useEffect(() => {
    onSnapshot(timestampSortedCollectionRef, (snapshot) => {
      const messages: Message[] = [];
      snapshot.docs.forEach((doc) => {
        messages.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(messages);
    });
  }, [timestampSortedCollectionRef]);
  return { subDocuments };
}

export default useSubCollection;