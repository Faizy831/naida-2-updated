import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getClient, editClient } from "../../actions/clientsActions";
import TableCard from "../layout/TableCard";
// reactstrap
import { Table, Input, CustomInput, Button, Badge } from "reactstrap";
// icons
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";
import Spinner from "../layout/Spinner";

function ClientDetails({ client, getClient, match, editClient }) {
  const [loading, setLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  // inputs Refs
  const official_nameRef = useRef();
  const numberRef = useRef();
  const contact_personRef = useRef();
  const phone_numberRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const countryRef = useRef();
  const finance_contactRef = useRef();
  const finance_emailRef = useRef();
  const currencyRef = useRef();
  const payment_termsRef = useRef();
  const send_invoice_autoRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const { id } = match.params;
      setLoading(true);
      await getClient(id);
      setLoading(false);
    };
    getData();
  }, [getClient, match.params]);

  const onSubmit = async () => {
    setLoading(true);
    const { id } = match.params;
    const updClient = {
      official_name: official_nameRef.current.value,
      number: numberRef.current.value,
      contact_person: contact_personRef.current.value,
      phone_number: phone_numberRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      country: countryRef.current.value,
      finance_contact: finance_contactRef.current.value,
      finance_email: finance_emailRef.current.value,
      currency: currencyRef.current.value,
      payment_terms: payment_termsRef.current.value,
      name: nameRef.current.value,
      send_invoice_auto: send_invoice_autoRef.current.checked
    };
    await editClient(id, updClient);
    await getClient(id);
    setLoading(false);
  };
  const {
    official_name,
    number,
    contact_person,
    phone_number,
    email,
    address,
    country,
    finance_contact,
    finance_email,
    currency,
    payment_terms,
    send_invoice_auto,
    name = ""
  } = client;

  return (
    <div>
      <h3>Clients</h3>
      <TableCard>
        <div className="d-flex justify-content-between table_card_header">
          <div className="d-flex">
            <h4 className="mr-3">{client.name}</h4>
            <Button
              size="lg"
              className={`btn-circle table-card-button mr-2 ${
                canEdit ? "disabled" : ""
              }`}
              onClick={() => setCanEdit(!canEdit)}
            >
              <Edit />
            </Button>
            <Button
              size="lg"
              className={`btn-circle table-card-button ${
                !canEdit ? "disabled" : ""
              }`}
              onClick={onSubmit}
            >
              <Done />
            </Button>
          </div>
          <div>
            <Link to="/clients">
              <Close />
            </Link>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <fieldset disabled={!canEdit}>
              <Table borderless className="table_card_table">
                <thead>
                  <tr>
                    <th width="13%">official name</th>
                    <th width="10%">number</th>
                    <th width="15%">contact person</th>
                    <th width="14%">phone number</th>
                    <th width="13%">email</th>
                    <th width="26%">address</th>
                    <th width="8%">country</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="13%">
                      <Input
                        innerRef={official_nameRef}
                        name="official_name"
                        defaultValue={official_name}
                      />
                    </td>
                    <td width="10%">
                      <Input
                        innerRef={numberRef}
                        name="number"
                        defaultValue={number}
                      />
                    </td>
                    <td width="15%">
                      <Input
                        innerRef={contact_personRef}
                        name="contact_person"
                        defaultValue={contact_person}
                      />
                    </td>
                    <td width="14%">
                      <Input
                        innerRef={phone_numberRef}
                        name="phone_number"
                        defaultValue={phone_number}
                      />
                    </td>
                    <td width="13%">
                      <Input
                        innerRef={emailRef}
                        name="email"
                        type="email"
                        defaultValue={email}
                      />
                    </td>
                    <td width="26%">
                      <Input
                        innerRef={addressRef}
                        name="address"
                        defaultValue={address}
                      />
                    </td>
                    <td width="8%">
                      <Input
                        innerRef={countryRef}
                        name="country"
                        defaultValue={country}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table borderless className="table_card_table">
                <thead>
                  <tr>
                    <th width="15%">Name</th>
                    <th width="15%">finance contact</th>
                    <th colSpan="2">finance E-mail</th>
                    <th width="15%">currency</th>
                    <th width="13%">payment terms</th>
                    <th colSpan="2">
                      <div className="d-flex justify-content-around align-items-center">
                        <div>send invoice automaticaly</div>
                        <CustomInput
                          innerRef={send_invoice_autoRef}
                          size="lg"
                          type="checkbox"
                          id="send_invoice_auto"
                          name="send_invoice_auto"
                          defaultChecked={send_invoice_auto}
                        />
                      </div>
                    </th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="13%">
                      <Input
                        innerRef={nameRef}
                        name="name"
                        defaultValue={name}
                      />
                    </td>
                    <td width="13%">
                      <Input
                        innerRef={finance_contactRef}
                        name="finance_contact"
                        defaultValue={finance_contact}
                      />
                    </td>
                    <td colSpan="2">
                      <Input
                        innerRef={finance_emailRef}
                        name="finance_email"
                        type="email"
                        defaultValue={finance_email}
                        className="w-75"
                      />
                    </td>
                    <td width="15%">
                      <Input
                        innerRef={currencyRef}
                        name="currency"
                        defaultValue={currency}
                      />
                    </td>
                    <td width="13%">
                      <Input
                        innerRef={payment_termsRef}
                        type="select"
                        name="payment_terms"
                        defaultValue={payment_terms}
                      >
                        <option value="CASH">CASH</option>
                        <option value="EOM + 30">EOM + 30</option>
                        <option value="EOM + 60">EOM + 60</option>
                        <option value="EOM + 90">EOM + 90</option>
                        <option value="NET + 30">NET + 30</option>
                        <option value="NET + 60">NET + 60</option>
                        <option value="NET + 90">NET + 90</option>
                      </Input>
                    </td>
                    <td />
                  </tr>
                </tbody>
              </Table>
            </fieldset>

            <div className="mt-4">
              <h3>Projects</h3>
              <div className="m-3">
                <h5 className="mb-2 client_project_header">Active</h5>
                <div className="my-3">
                  {client.projects
                    .filter(p => !p.archived)
                    .map(p => (
                      <Badge
                        style={{
                          backgroundColor: "#4AD991"
                        }}
                        pill
                        className="table-card-badge"
                      >
                        {p.name}
                      </Badge>
                    ))}
                </div>
                <hr />
              </div>
              <div className="m-3">
                <h5 className="mb-2 client_project_header">NON-ACTIVE</h5>
                <div className="my-3">
                  {client.projects
                    .filter(p => p.archived)
                    .map(p => (
                      <Badge
                        style={{
                          backgroundColor: "#FF6565"
                        }}
                        pill
                        className="table-card-badge"
                      >
                        {p.name}
                      </Badge>
                    ))}
                </div>
                <hr />
              </div>
            </div>
          </React.Fragment>
        )}
      </TableCard>
    </div>
  );
}
const mapStateToProps = state => ({
  client: state.clients.currentClient
});
export default connect(
  mapStateToProps,
  {
    getClient,
    editClient
  }
)(ClientDetails);
