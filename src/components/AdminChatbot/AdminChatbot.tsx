import { useState, useRef, useEffect } from "react";

import {
  ChatContainer,
  MainContainer,
  Message,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input } from "@components/common";
import { ThingLoader } from "@components/ThingLoader";
import GeminiApi from "@api/gemini.api";
import { RootState } from "@redux/store";
import { addMessage } from "@redux/slices/botSlice";
import { PaperClip, SendArrow } from "@svg";

import "./chat.css";

const AdminChatbot = () => {
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const inputref = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
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

  useEffect(() => {
    if (inputref.current) {
      inputref.current.focus();
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-t-xl w-full flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 pl-4">Chatbot</h2>

      {messages.length === 0 && (
        <div
          className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          text-2xl text-gray-600 font-bold animate-slideIn"
        >
          How can I help you?
        </div>
      )}

      <div className="flex flex-col justify-between  p-6 max-h-[82svh] w-4/5 ">
        <MainContainer className="bg-transparent overflow-y-hidden">
          <ChatContainer className="bg-transparent">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">
              Knowledge Assistant
            </h2>
            <MessageList
              className="h-[calc(100vh-380px)] overflow-y-auto pr-2 pb-4 bg-transparent"
              scrollBehavior="smooth"
            >
              {messages?.map((item, i) => (
                <div
                  key={i}
                  className={`mb-6 mt-3 ${
                    item?.sender === "gemini"
                      ? "flex gap-4"
                      : "flex justify-end"
                  }`}
                >
                  {item?.sender === "gemini" && item?.text && (
                    <div className="flex flex-col w-3/5  p-3 rounded-3xl font-normal text-base text-[#141B34]">
                      <Message
                        model={{
                          ...item,
                          type: "custom",
                          direction:
                            item.sender === "gemini" ? "incoming" : "outgoing",
                          position: "normal",
                        }}
                        className="bg-indigo-50 font-normal shadow-sm rounded-2xl p-0!"
                      >
                        <Message.CustomContent className="p-3 text-gray-800">
                          <ReactMarkdown>{item?.text}</ReactMarkdown>
                        </Message.CustomContent>
                      </Message>
                    </div>
                  )}

                  {item?.sender !== "gemini" && (
                    <div className="max-w-[60%]">
                      <Message
                        model={{
                          ...item,
                          type: "custom",
                          direction:
                            item.sender === "user" ? "outgoing" : "incoming",
                          position: "normal",
                        }}
                        className=" text-white rounded-full p-2 bg-[#EEEEEE] shadow-sm font-normal text-base"
                      >
                        <Message.CustomContent className="p-3 text-[#141B34]">
                          <ReactMarkdown>{item?.text}</ReactMarkdown>
                        </Message.CustomContent>
                      </Message>
                    </div>
                  )}
                </div>
              ))}
            </MessageList>
          </ChatContainer>
        </MainContainer>

        <div className="mt-6 flex flex-col items-center w-full">
          <div className="w-full mb-2 min-h-8 flex justify-center">
            {isThinking && <ThingLoader />}
          </div>

          <div className="w-full max-w-5xl flex items-center border border-gray-300 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
            <button className="text-gray-400 hover:text-gray-600 transition-colors mr-2">
              <PaperClip />
            </button>

            <Input
              value={currentMessage}
              ref={inputref}
              placeholder="Ask questions from knowledge expert..."
              wrapperClass="flex-grow !border-none"
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              topMostWrapper="!h-[40px] overflow-hidden !mb-0 flex items-center"
              className="text-gray-700 placeholder-gray-400 focus:outline-none"
            />

            <SendArrow
              isThinking={isThinking}
              onClick={handleSendMsg}
              className="text-blue-600 hover:text-blue-700 cursor-pointer"
            />
          </div>

          <p className="text-center text-gray-500 text-xs font-medium mt-3">
            Bot responses may not always be accurate. Use the information at
            your own discretion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminChatbot;
