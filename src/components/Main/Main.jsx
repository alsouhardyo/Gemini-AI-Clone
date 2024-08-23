import { useContext, useState } from "react";
import { assets } from "../../assets/images/assets";
import { IoApps } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { MdSend } from "react-icons/md";
import { Context } from "../../context/Context";
const Main = () => {
    const data = [
        {
            des: "Suggest beautiful places to see on an upcoming road trip",
            imgSrc: <FaCompass className="w-6 h-6" />
        },
        {
            des: "Briefly summarize this concept: urban planning",
            imgSrc: <FaLightbulb className="w-6 h-6" />
        },
        {
            des: "Brainstorm team bonding activities for our work retreat",
            imgSrc: <FaRegMessage className="w-6 h-6" />
        },
        {
            des: "Tell me about React js and React native",
            imgSrc: <FaCode />
        }
    ];
    const [change, setChange] = useState(false);
    const {
        onSent,
        recentPrompt,
        setPreviousPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input
    } = useContext(Context);
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // Call the onSent function here when Enter is pressed
            onSent();
        }
    };
    return (
        <div className="flex-[1] dark:bg-[#131314] dark:text-white">
            <div className="p-6 flex justify-between items-center">
                <div className="flex justify-between items-center gap-2 cursor-pointer">
                    <p className="text-xl">Gemini</p>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <button className="px-4 py-2 bg-[#dbe1e9] rounded-xl hover:bg-[#ccd3db] dark:bg-[#39393a] dark:hover:bg-[#47494A] ">
                        <p className="text-sm">Try Gemini Advanced</p>
                    </button>
                    <IoApps className="cursor-pointer text-2xl" />
                    <img
                        src={assets.user_icon}
                        alt="image of the user"
                        className="w-8 h-8 rounded-full cursor-pointer"
                    />
                </div>
            </div>
            <div className="max-w-[900px] mx-auto">
                {!showResult ? (
                    <>
                        <div className="p-[20px]">
                            <p className="font-medium cta text-6xl mb-3">
                                <span>Hello, Abdullah.</span>
                            </p>
                            <p className="font-medium text-[#C4C7C5] text-6xl dark:text-[#444746]">
                                How can I help you today?
                            </p>
                        </div>
                        <div className="grid grid-cols-4 justify-center items-center gap-5 mt-10 ml-5">
                            {data.map((card, index) => {
                                return (
                                    <div
                                        className="bg-[#F0F4F9] p-5 rounded-xl hover:bg-[#DFE4EA] cursor-pointer h-[200px] relative dark:bg-[#1E1F20] dark:hover:bg-[#333537]"
                                        key={index}
                                        onClick={() => {
                                            setPreviousPrompt((prev) => [
                                                ...prev,
                                                card.des
                                            ]);
                                            onSent(card.des);
                                        }}
                                    >
                                        <p className="text-lg font-light">
                                            {card.des}
                                        </p>
                                        <div className="p-2 rounded-full bg-white dark:bg-black absolute bottom-3 right-3">
                                            {card.imgSrc}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-start items-start gap-8 flex-col px-[5%] overflow-y-scroll result max-h-[70vh] py-5">
                        <div className="flex justify-start items-center gap-5">
                            <img
                                src={assets.user_icon}
                                alt="image of the user"
                                className="w-10 h-10 rounded-full"
                            />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="flex justify-start items-start gap-5">
                            <img
                                src={assets.gemini_icon}
                                alt="image of the gemini icon"
                                className="w-10 h-10"
                            />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: resultData
                                    }}
                                    className="resultData"
                                ></p>
                            )}
                        </div>
                    </div>
                )}
                <div>
                    <div className="flex justify-between items-center gap-5 bg-[#F0F4F9] px-6 py-4 rounded-full ml-5 dark:bg-[#1E1F20] absolute bottom-12 w-[900px]">
                        <input
                            type="text"
                            placeholder="Enter a prompt here"
                            className="font-outfit text-lg text-gray-900 bg-[#F0F4F9] border-none outline-none dark:bg-[#1E1F20] dark:text-white w-[700px]"
                            onChange={(e) => {
                                setChange(e.target.value.length > 0);
                                setInput(e.target.value);
                            }}
                            onKeyDown={handleKeyDown}
                            value={input}
                        />
                        <div className="flex justify-center items-center gap-5">
                            <GrGallery className="cursor-pointer w-6 h-6" />
                            <IoMdMic className="cursor-pointer w-6 h-6" />
                            <MdSend
                                className={
                                    change
                                        ? `w-6 h-6 cursor-pointer block`
                                        : `w-6 h-6 cursor-pointer hidden`
                                }
                                onClick={() => {
                                    onSent();
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm mt-3 text-center absolute bottom-3 ml-20">
                            Gemini may display inaccurate info, including about
                            people, so double-check its responses. Your privacy
                            & Gemini Apps
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
