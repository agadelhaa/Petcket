import { FaCalendarAlt, FaCoins, FaWeight } from "react-icons/fa";
import { Link, Form} from "react-router-dom";
import Wrapper from "../wrappers/Job";
import PurchaseInfo from "./PurchaseInfo";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Purchase = ({
  _id,brand, weight, price, date
}) => {
  const parsedDate = parseISO(date);
  const localDate = new Date(
    parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000
  );
  const dateToShow = format(localDate, "dd/MM/yyyy", { locale: ptBR });

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <Wrapper>
      <header >
        <h5 style={{ color: "#ff9f1c", fontWeight: "bold" }}>{brand}</h5>
      </header>
      <div className="content">
        <div className="content-center">
          <PurchaseInfo icon={<FaCoins />} text={`R$ ${formattedPrice}`} />
          <PurchaseInfo icon={<FaWeight />} text={`${weight} KG`} />
          <PurchaseInfo icon={<FaCalendarAlt />} text={dateToShow} />
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-purchase/${_id}`} className="btn edit-btn">Editar</Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Deletar
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Purchase;
