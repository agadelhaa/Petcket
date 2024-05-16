import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { Logotipo } from "../assets/components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../assets/components";
import { ToastContainer, toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("auth/request-password-reset", data);
    toast.success("Email enviado com sucesso");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function RequestPasswordReset() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <ToastContainer />
      <Form method="post" className="form">
        <Logotipo />
        <h4>Email para redefinição de senha:</h4>
        <FormRow
          type="email"
          name="email"
          defaultValue="amandagadelhaamorim@unifor.br"
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Enviando" : "Enviar"}{" "}
        </button>
        <p>
          Ainda não tem uma conta?
          <Link to="/register"> Registre-se</Link>
        </p>
      </Form>
    </Wrapper>
  );
}
export default RequestPasswordReset;
