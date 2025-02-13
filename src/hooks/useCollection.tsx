import { useMemo } from 'react';
import { db } from '@/firebase';
import { collection, DocumentData, onSnapshot, Query, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'

interface Channels {
    id: string;
    channel: DocumentData;
}

const useCollection = (data: string) => {

  const [documents, setDocuments] = useState<Channels[]>([]);

  const results: Query<DocumentData> = useMemo(() =>
    query(collection(db, data)), [data]);

  useEffect(() => {
    onSnapshot(results, (querySnapshot) => {
      const channels: Channels[] = [];

      querySnapshot.docs.forEach((doc) => 
          channels.push({
            id: doc.id,
            channel: doc.data(),
        })
      );
      setDocuments(channels);
    });
  }, [results]);
  return { documents };
}

export default useCollection