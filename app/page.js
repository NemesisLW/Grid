import Avatar from "@/components/Avatar";
import Chat from "@/components/Chat";

const Home = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Avatar/>
      <Chat />
    </div>
  );
};

export default Home;