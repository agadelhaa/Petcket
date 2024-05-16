import { FormRow } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/purchases', data)
    toast.success('Compra registrada com sucesso')
    return redirect('/dashboard/all-purchases')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const formattedPrice = (price) => {
  return parseFloat(price).toFixed(2);
};

const AddPurchase = () => {
  const {user} = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-tittle">Registrar novas compras</h4>
        <div className="form-center">
          <FormRow type="date" name="date" labelText="Data" />
          <FormRow type="text" name="brand" labelText="Marca" />
          <FormRow type="number" name="weight" labelText="Peso (KG)" />
          <FormRow type="number" name="price" labelText="Preço (R$)" step="0.01" />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
            >
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>
            </div>
      </Form>
    </Wrapper>
  );
};

export default AddPurchase;
