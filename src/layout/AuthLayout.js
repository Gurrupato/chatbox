const AuthLayout = ({ children }) => {
  return (
    <div>
      <nav className="flex items-center justify-center">
        <p className="chat-slogan">Lets get chatty</p>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
