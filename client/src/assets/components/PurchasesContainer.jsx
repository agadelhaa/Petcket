import Purchase from "./Purchase";
import Wrapper from "../wrappers/JobsContainer";
import { useAllPurchasesContext } from "../../pages/AllPurchases";
import PageBtnContainer from "./PageBtnContainer";
import convertToLocaleDateString from "../../utils/convertToLocaleDateString";

const PurchasesContainer = () => {
  const { data } = useAllPurchasesContext();
  const { purchases, totalPurchases, numOfPages } = data;

  purchases.forEach((purchase) => console.log(`Render Date: ${purchase.date}`));

  if (purchases.length === 0) {
    return (
      <Wrapper>
        <h2>Sem compras cadastradas...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalPurchases} compra{purchases.length > 1 && "s"} encontrada
        {purchases.length > 1 && "s"}
      </h5>
      <div className="purchases">
        {purchases.map((purchase) => (
          <Purchase key={purchase._id} {...purchase} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default PurchasesContainer;
