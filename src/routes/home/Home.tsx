import banner from "../../assets/images/banner.png";
import logoNT from "../../assets/icons/logoNT.svg";
import Login from "../../components/login/Login";

const Home = () => {
  return (
    <section>
      <div className="w-full flex gap-16">
        <div className="w-full max-w-[35%] h-screen">
          <img
            className="w-full h-[100%] object-cover"
            width={100}
            height={100}
            src={banner}
            loading="lazy"
            alt="najot talim banner"
          />
        </div>
        <div className="w-[50%] h-full p-4 flex flex-col">
          <div className="w-full">
            <img width={200} height={200} src={logoNT} loading="lazy" alt="logoNT" />
          </div>
          <div className="w-full flex mt-[150px] items-center max-w-[400px]">
            <Login />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
