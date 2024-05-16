import React from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { PURCHASE_SORT_BY } from "../../../../utils/constants";
import { useAllPurchasesContext } from "../../pages/AllPurchases";
import { toast } from "react-toastify";

const SearchContainer = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { searchValues = {}} = useAllPurchasesContext();
  const { search='', year='', month='', sort='' } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  const validateAndSubmit = (form) => {
    const selectedMonth = form.month.value;
    const selectedYear = form.year.value;
    if (selectedMonth && !selectedYear) {
      toast.error("Por favor, selecione um ano ao escolher um mês");
      return false;
    }
    submit(form);
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">formulário de busca</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              validateAndSubmit(form);
            })}
          />
          <FormRowSelect
            labelText="Ano"
            name="year"
            list={["", ...years]}
            defaultValue={year}
            onChange={(e) => {
              validateAndSubmit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="Mês"
            name="month"
            list={["", ...months]}
            defaultValue={month}
            onChange={(e) => {
              validateAndSubmit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="Ordenar"
            name="sort"
            list={[...Object.values(PURCHASE_SORT_BY)]}
            defaultValue={sort}
            onChange={(e) => {
              validateAndSubmit(e.currentTarget.form);
            }}
          />
          <Link
            to="/dashboard/all-purchases"
            className="btn form-btn delete-btn"
          >
            {" "}
            Resetar valores
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
