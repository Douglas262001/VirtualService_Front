import logoUrl from "../../assets/newlogo.png";

const Logo = () => {
  return (
    <div className="h-full w-full flex justify-center">
      <img id="logo-img" src={logoUrl} alt="e-tap" />
    </div>
  );
};

export default Logo;
