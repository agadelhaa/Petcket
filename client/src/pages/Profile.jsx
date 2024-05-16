import { FormRow } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({request}) => {
  const formData = await request.formData();
  const file = formData.get('avatar')
  if(file && file.size > 500000){
    toast.error('Imagem acima de 0.5 MB')
    return null;
  }
  try {
    await customFetch.patch('/users/update-user', formData)
    toast.success('Perfil atualizado com sucesso')
    const navigate = useNavigate();
    navigate('/profile');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null;
  }
}

const Profile = () => {
  const {user} = useOutletContext()
  const {name, lastName, email} = user
  const navigation = useNavigate()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title"> Perfil</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Selecione uma imagem (max 0.5 MB)
            </label>
            <input type="file" id="avatar" name="avatar" className="form-input" accept="image/*" />
          </div>
          <FormRow type="text" name="name" defaultValue={name} labelText= "nome"/>
          <FormRow type="text" name="lastName" defaultValue={lastName} labelText="sobrenome"/>
          <FormRow type="email" name="email" defaultValue={email} labelText="email"/>
          <button className="btn btn-block form-btn" type="submit" disabled = {isSubmitting}>
            {isSubmitting? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
