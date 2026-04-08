const navigate = useNavigate();

const handleLogout = () => {
  localStorage.clear();
  navigate("/login");
};