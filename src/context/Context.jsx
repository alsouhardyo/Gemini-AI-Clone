import { createContext, useState } from "react";
import run from "../Config/gemini";
export const Context = createContext();
const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    function delayPara(index, nextWord) {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    }
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            setPreviousPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        let responseArr = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArr.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArr[i];
            } else {
                newResponse +=
                    "<b>" + responseArr[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
    };
    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};
export default ContextProvider;
