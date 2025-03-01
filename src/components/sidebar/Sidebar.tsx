import React from 'react'
import styles from "@/styles/sidebar/Sidebar.module.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import SidebarChannel from './SidebarChannel';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '@/firebase';
import { useAppSelector } from '@/app/hooks';
import useCollection from '@/hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';
import Image from 'next/image';
import { Avatar } from '@mui/material';

const Sidebar = () => {

  const user = useAppSelector((state) => state.user.user);
  const { documents: channels} = useCollection("channels");

  const addChannel = async () => {
     const channelName = prompt("新しいチャンネルを作成します");

     if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
     }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLeft}>
        <div className={styles.serverIcon}>
          <Image src="/discordIcon.png" alt="" width={50} height={50}></Image>
        </div>

      </div>
      <div className={styles.sidebarRight}>
        <div className={styles.sidebarTop}>
            <h3>Discord</h3>
            <ExpandMoreIcon />
        </div>
        <div className={styles.sidebarChannels}>
            <div className={styles.sidebarChannelsHeader}>
                <div className={styles.sidebarHeader}>
                </div>
                <ExpandMoreIcon />
                <h4>プログラミングチャンネル</h4>
                <AddIcon className={styles.sidebarAddIcon} onClick={() => addChannel()} />
            </div>
            <div className={styles.sidebarChannelList}>
              {channels.map((channel) => (
                <SidebarChannel channel={channel} id={channel.id} key={channel.id}/>
              ))}
            </div>
            <div className={styles.sidebarFooter}>
                <div className={styles.sidebarAccount}>
                  {user === null ?
                    <Avatar />
                  : 
                    <Image src={user.photo} alt="" width={50} height={50} onClick={() => auth.signOut()}/>
                    }
                    <div className={styles.accountName}>
                        <h4>{user?.displayName}</h4>
                        <span>#{user?.uid.substring(0, 4)}</span>
                    </div>
                </div>
                <div className={styles.sidebarVoice}>
                    <MicIcon />
                    <HeadphonesIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar