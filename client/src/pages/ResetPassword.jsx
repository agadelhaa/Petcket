import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { Logotipo } from "../assets/components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../assets/components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useSearchParams } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("auth/reset-password", data);
    toast.success("Senha redefinida com sucesso");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function ResetPassword() {
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logotipo />
        <h4>Insira nova senha:</h4>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="token" value={token} />
        <FormRow type="password" name="password" labelText="senha" />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Enviando" : "Enviar"}{" "}
        </button>
      </Form>
    </Wrapper>
  );
}
export default ResetPassword;
