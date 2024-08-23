import { assets } from "../../assets/images/assets";
import { useContext, useState } from "react";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { LuHistory } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Context } from "../../context/Context";
const SideBar = () => {
    const bottomData = [
        {
            id: 1,
            imgSrc: <GoQuestion className="w-5 h-5" />,
            title: "Help"
        },
        {
            id: 2,
            imgSrc: <LuHistory className="w-5 h-5" />,
            title: "Activity"
        },
        {
            id: 3,
            imgSrc: <IoSettingsOutline className="w-5 h-5" />,
            title: "Settings"
        }
    ];
    const [open, setOpen] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const { onSent, previousPrompt, setRecentPrompt, newChat } =
        useContext(Context);
    function collapseOpen() {
        setOpen(!open);
        setOpenSettings(false);
    }
    const themeToggle = () => {
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.classList.toggle("dark");
    };
    async function againQuestion(prompt) {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    const themeText = isDarkTheme ? "Light Theme" : "Dark Theme";
    return (
        <div>
            <div className="flex justify-between flex-col h-screen bg-[#F0F4F9] pl-4 pr-7 py-7 dark:bg-[#1E1F20]">
                <div>
                    <FiMenu
                        className="w-5 h-5 cursor-pointer ml-4"
                        onClick={collapseOpen}
                    />
                    <button
                        className={
                            open
                                ? `bg-[#dbe1e9] dark:bg-[#1A1A1B] dark:hover:bg-[#393B3D] px-4 py-2 rounded-3xl flex justify-between items-center gap-3 mt-10 ease-in-out hover:bg-[#ccd3db] `
                                : `bg-[#dbe1e9] dark:bg-[#1A1A1B] dark:hover:bg-[#393B3D] p-4 rounded-full mt-10 ease-in-out hover:bg-[#ccd3db]`
                        }
                        onClick={newChat}
                    >
                        <FaPlus className="w-5 h-5" />
                        <p className={open ? `block anim` : `hidden`}>
                            New Chat
                        </p>
                    </button>
                    <div
                        className={
                            open
                                ? `block anim max-h-[288px] overflow-y-scroll recent-scroll pb-5 mt-5`
                                : `hidden`
                        }
                    >
                        <p className="mt-8">Recent</p>
                        <div
                            className={
                                open
                                    ? `hidden`
                                    : `flex justify-between items-center gap-2 mt-6 hover:bg-[#E2E6EB] dark:hover:bg-[#333537] pl-3 pr-8 py-2 rounded-3xl ease-in-out cursor-pointer`
                            }
                        >
                            <FaRegMessage className="w-5" />
                            <p>What is Gemini...</p>
                        </div>
                        <div className="mt-6">
                            {previousPrompt.map((prompt, index) => {
                                return (
                                    <div
                                        className="flex justify-start items-center gap-2 hover:bg-[#E2E6EB] dark:hover:bg-[#333537] rounded-3xl ease-in-out cursor-pointer pl-3 pr-8 py-2"
                                        onClick={() => {
                                            againQuestion(prompt);
                                        }}
                                        key={index}
                                    >
                                        <FaRegMessage className="w-5" />
                                        <p>{prompt.slice(0, 18)}...</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    {bottomData.map((item) => {
                        return (
                            <div
                                className="flex justify-start items-center gap-3 hover:bg-[#E2E6EB] dark:hover:bg-[#333537] pl-3 py-[10px] rounded-3xl ease-in-out cursor-pointer"
                                key={item.id}
                                onClick={() => {
                                    if (item.title === "Settings") {
                                        (() => {
                                            setOpenSettings(!openSettings);
                                        })();
                                    }
                                }}
                            >
                                {item.imgSrc}
                                <p className={open ? `block anim` : `hidden`}>
                                    {item.title}
                                </p>
                            </div>
                        );
                    })}
                    <div
                        className={(() => {
                            if (open && openSettings) {
                                return `bg-[#F0F4F9] dark:bg-[#1E1F20] shadow-2xl px-4 py-2 absolute left-40 bottom-10 rounded-xl block`;
                            } else if (openSettings) {
                                return `bg-[#F0F4F9] dark:bg-[#1E1F20] shadow-2xl px-4 py-2 absolute left-16 bottom-10 rounded-xl block`;
                            } else {
                                return `hidden`;
                            }
                        })()}
                    >
                        <div className="flex justify-start items-center gap-4 cursor-pointer hover:bg-[#E2E6EB] dark:hover:bg-[#333537] p-2 rounded-xl">
                            <IoExtensionPuzzleOutline className="text-2xl" />
                            <p>Extensions</p>
                        </div>
                        <div className="flex justify-start items-center gap-4 cursor-pointer hover:bg-[#E2E6EB] dark:hover:bg-[#333537] p-2 rounded-xl">
                            <IoLinkSharp className="text-2xl" />
                            <p>Your Public Links</p>
                        </div>
                        <div
                            className="flex justify-start items-center gap-4 cursor-pointer hover:bg-[#E2E6EB] dark:hover:bg-[#333537] p-2 rounded-xl"
                            onClick={themeToggle}
                        >
                            <IoMoonOutline className="text-2xl" />
                            <p>{themeText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
