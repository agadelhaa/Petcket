import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"
import { redirect } from "react-router-dom"

export const action = async({params}) => {
  try {
    await customFetch.delete(`/purchases/${params.id}`)
    toast.success('Compra deletada com sucesso')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return redirect('/dashboard/all-purchases')
}

const DeletePurchase = () => {
  return (
    <h1>DeletePurchase Page</h1>
  )
}

export default DeletePurchase