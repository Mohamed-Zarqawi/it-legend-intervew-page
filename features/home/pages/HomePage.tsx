import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <Image
        src={"/images/background.png"}
        alt={"background"}
        width={3000}
        height={3000}
        className="h-full w-full"
      />
    </div>
  );
};

export default HomePage;
