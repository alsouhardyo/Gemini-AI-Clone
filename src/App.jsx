import SideBar from "./components/SideBar/SideBar";
import Main from "./components/Main/Main";
const App = () => {
    return (
        <div className="max-h-screen dark:bg-[#131314] dark:text-white flex">
            <SideBar />
            <Main />
        </div>
    );
};

export default App;
