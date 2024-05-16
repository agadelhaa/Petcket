import { FormRow } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import {toast} from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({params}) => {
  try {
    const {data} = await customFetch.get(`/purchases/${params.id}`)
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect('/dashboard/all-purchases')
  }
}

export const action = async ({request, params}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
  await customFetch.patch(`/purchases/${params.id}`, data)
  toast.success('Compra editada com sucesso')
  return redirect('/dashboard/all-purchases')
 } catch (error) {
  toast.error(error?.response?.data?.msg)
  return error;
 }
}

const EditPurchase = () => {
  const {purchase} = useLoaderData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title"> Editar compra</h4>
        <div className="form-center">
          <FormRow
            type="date"
            name="date"
            labelText="Data"
            defaultValue={purchase.date}
          />
          <FormRow
            type="text"
            name="brand"
            labelText="Marca"
            defaultValue={purchase.brand}
          />
          <FormRow
            type="number"
            name="weight"
            labelText="Peso (KG)"
            defaultValue={purchase.weight}
          />
          <FormRow
            type="number"
            name="price"
            labelText="Preço (R$)"
            step="0.01"
            defaultValue={purchase.price}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default EditPurchase