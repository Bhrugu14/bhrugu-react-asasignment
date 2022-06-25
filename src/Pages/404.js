import { useNavigate } from "react-router-dom";
const Error = () => {
  let navigate = useNavigate();
  return (
    <div className="errorPage">
      <h1>ERROR</h1>
      <label onClick={() => navigate(-1)}>Go back</label>
      <label onClick={() => navigate("/")}>Go to home</label>
    </div>
  );
};
export default Error;
