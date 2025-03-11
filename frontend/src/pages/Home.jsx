import React from "react";
import useChatStore from "../store/useChatStore";
import SideBar from "../components/sidebar";
import ChatContainer from "../components/chat-container";
import NoChatSelected from "../components/no-chat-selected";

export default function Home() {
  const { selectedUser } = useChatStore();
  return (
    <div className="bg-base-200 h-screen">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="bg-base-100 shadow-cl h-[calc(100vh-8rem)] w-full max-w-6xl rounded-lg">
          <div className="flex h-full overflow-hidden rounded-lg">
            <SideBar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}
