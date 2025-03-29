import { useState } from "react";

import {
  ChatContainer,
  MainContainer,
  Message,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Copy, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

import GeminiApi from "@api/gemini.api";
import { Input } from "@components/common";
import { RootState } from "@redux/store";
import { ThingLoader } from "@components/ThingLoader";
import { addMessage } from "@redux/slices/botSlice";
import { selectUser } from "@redux/slices/userSlice";
import { SendArrow } from "@svg";

import "./chat.css";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const messages = useSelector((state: RootState) => state.bot.messages);

  const geminiApi = new GeminiApi();

  async function processMessage(newMessage: string) {
    setIsThinking(true);

    dispatch(addMessage({ text: newMessage, sender: "user" }));

    const response = await geminiApi.getResponse(newMessage);

    if (!response) {
      toast.error("Unable to get Response");
      setIsThinking(false);
      return;
    }

    dispatch(addMessage({ text: response, sender: "gemini" }));

    setIsThinking(false);
  }

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter" && !isThinking) {
      event.preventDefault();
      const inputValue = event.target.value.trim();
      if (inputValue) {
        processMessage(inputValue);
        setCurrentMessage("");

        event.target.value = "";
      }
    }
  };

  const handleSendMsg = () => {
    if (currentMessage !== "" && !isThinking) {
      processMessage(currentMessage);
      setCurrentMessage("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.info("Copied to clipboard!");
    });
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => {
            user?.user_info?.email
              ? setIsOpen(!isOpen)
              : toast.info("You need to login first to chat with us!");
          }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-16 right-6 bg-white border border-gray-300 shadow-xl rounded-lg w-80 h-[450px] flex flex-col">
          <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">IntelliWear Chatbot</h2>
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✕
            </button>
          </div>

          <MainContainer className="flex-grow overflow-hidden">
            <ChatContainer>
              <MessageList className="h-[350px] overflow-y-auto p-3 relative">
                {messages.length === 0 && (
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-lg text-gray-600 font-bold animate-slideIn">
                    How can I help you?
                  </div>
                )}

                {messages?.map((item, i) => (
                  <div
                    key={i}
                    className={`mb-3 ${
                      item?.sender === "gemini"
                        ? "flex gap-4"
                        : "flex justify-end"
                    }`}
                  >
                    {item?.sender === "gemini" && item?.text && (
                      <Message
                        model={{
                          ...item,
                          type: "custom",
                          direction: "incoming",
                          position: "normal",
                        }}
                      >
                        <Message.CustomContent className="bg-gray-100 p-2 rounded-lg relative py-4">
                          <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => copyToClipboard(item?.text)}
                          >
                            <Copy size={16} />
                          </button>
                          <ReactMarkdown>{item?.text}</ReactMarkdown>
                        </Message.CustomContent>
                      </Message>
                    )}

                    {item?.sender !== "gemini" && (
                      <Message
                        model={{
                          ...item,
                          type: "custom",
                          direction: "outgoing",
                          position: "normal",
                        }}
                      >
                        <Message.CustomContent className="bg-blue-100 p-2 rounded-lg">
                          <ReactMarkdown>{item?.text}</ReactMarkdown>
                        </Message.CustomContent>
                      </Message>
                    )}
                  </div>
                ))}
              </MessageList>
            </ChatContainer>
          </MainContainer>

          <div className="w-full mb-2 min-h-8 flex justify-center">
            {isThinking && <ThingLoader />}
          </div>

          <div className="p-3 border-t flex gap-2 items-center">
            <Input
              value={currentMessage}
              placeholder="Ask something..."
              className="flex-grow"
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SendArrow
              isThinking={isThinking}
              onClick={handleSendMsg}
              className="text-blue-600 cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
