import Wrapper from "../wrappers/JobInfo";

const PurchaseInfo = ({icon, text}) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};
export default PurchaseInfo;
