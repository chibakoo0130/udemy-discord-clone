import React from 'react'
import styles from "@/styles/sidebar/SidebarChannel.module.scss";
import { DocumentData } from 'firebase/firestore';
import { useAppDispatch } from '@/app/hooks';
import { setChannelInfo } from '@/features/channelSlice';

type Props = {
  id: string;
  channel: DocumentData;
}


function SidebarChannel(props: Props) {
  const { id, channel } = props;

  const dispatch = useAppDispatch();

  return (
    <div className={styles.sidebarChannel} onClick={() => dispatch(setChannelInfo({
      channelId: id,
      channelName: channel.channel.channelName,
    }))}>
        <h4>
            <span className={styles.sidebarChannelHash}>#</span>
              {channel.channel.channelName}
        </h4>
    </div>
  )
}

export default SidebarChannel