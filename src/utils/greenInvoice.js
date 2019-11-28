import axios from "axios";
// api keys
import config from "../config/apis";

const { GI_API, GI_Secret, sandbox_url } = config;
let TOKEN = null;

export const addDocument = async () => {
  const token = await verifyGreenInvoiceToken();
  console.log("calling API DOCUMENT", token)
  try {
    const res = await axios.post(
      `https://sandbox.d.greeninvoice.co.il/api/v1/documents`,
      {
          'description': 'Just an order',
          'remarks': 'Some remarks',
          'footer': 'Texts in footer',
          'emailContent': 'Email content',
          'type': 300,
          'date': '2019-11-26',
          'dueDate': '2019-11-30',
          'lang': 'he',
          'currency': 'ILS',
          'vatType': 0,
          'discount': {
            'amount': 1,
            'type': 'sum'
          },
          'rounding': true,
          'signed': true,
          'attachment': true,
          'maxPayments': 1,
          'paymentRequestData': {
            'plugins': [
              {
                'id': '031e827a-c664-c1e4-d231-a80027271123'
              }
            ],
            'maxPayments': 1
          },
          'client': {
            'id': 'bex0U0RAThPVa1M8ZE0m',
         
          },
          'payment': [
            {
              'date': '2016-03-21',
              'type': 2,
              'price': 300,
              'currency': 'ILS',
              'currencyRate': 1,
              'bankName': 'My Bank',
              'bankBranch': '198',
              'bankAccount': '212435',
              'chequeNum': '10002',
              'accountId': 'TFGFFGSYYE',
              'transactionId': 'TGBBBXNLKS75SKJS',
              'appType': 1,
              'subType': 1,
              'cardType': 2,
              'cardNum': '8765',
              'dealType': 2,
              'numPayments': 1,
              'firstPayment': 10
            }
          ]
      },
      { headers: { Authorization: "Bearer " + token, 'Content-Type': 'application/json' } }
    );
    console.log("res", res)
    return res.data;
  } catch (error) {
    console.log("error bela ",error);
  }
}

export const getToken = async () => {
  try {
    const res = await axios.post(
      `https://sandbox.d.greeninvoice.co.il/api/v1/account/token`,
      {
        id: GI_API,
        secret: GI_Secret
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyGreenInvoiceToken = async () => {
  const greenInvoice = JSON.parse(localStorage.getItem("greenInvoice"));
  if (greenInvoice) {
    const { token, expires } = greenInvoice;
    const currentTime = Date.now() / 1000;
    if (expires < currentTime) {
      const { token, expires } = await getToken();
      saveGreenInvoiceToken({ token, expires });
      return token;
    } else {
      return token;
    }
  } else {
    const { token, expires } = await getToken();

    saveGreenInvoiceToken({ token, expires });
    return token;
  }
};

const saveGreenInvoiceToken = ({ token, expires }) => {
  localStorage.setItem("greenInvoice", JSON.stringify({ token, expires }));
};

/*------------------------clients------------------------------*/
export const getClient = async id => {
  const token = await verifyGreenInvoiceToken();

  try {
    const res = await axios.get(
      `https://sandbox.d.greeninvoice.co.il/api/v1/clients/${id}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    console.log("client", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addClient = async newClient => {
  const token = await verifyGreenInvoiceToken();
console.log("new client ",newClient)
  const {
    official_name ,
    number,
    contact_person ,
    phone_number ,
    email ,
    address ,
    country ,
    send_invoice_auto,
    finance_contact,
    finance_email ,
    currency,
    payment_terms
  } = newClient;
  try {
    const res = await axios.post(
      `https://sandbox.d.greeninvoice.co.il/api/v1/clients`,
      {
        "name": official_name,
        "active": true,
        "department": "Sales",
        "accountingKey": "10202",
        "paymentTerms": 0,
        "address": "רחוב סוקולוב 15",
        "city": "תל אביב-יפו",
        "zip": "6291790",
        "country": "IL",
        "category": 16,
        "subCategory": 1602,
        "phone": "565656565656",
        "fax": "565656565656",
        "mobile": "565656565656",
        "remarks": "Customer approved 2016 sales",
        "contactPerson": "Ido",
        "emails": [],
        "labels": []
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    console.log("here is gi data ", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateClient = async updClient => {
  const token = await verifyGreenInvoiceToken();
  const {
    official_name,
    number,
    contact_person,
    phone_number,
    email,
    address,
    country,
    send_invoice_auto,
    finance_contact,
    finance_email,
    currency,
    payment_terms
  } = updClient;
  try {
    const res = await axios.put(
      `https://sandbox.d.greeninvoice.co.il/api/v1/clients/${updClient.id}`,
      {
        name: official_name,
        active: true,
        accountingKey: number,
        paymentTerms: 0,
        address,
        country,
        phone: phone_number,
        contactPerson: contact_person,
        emails: [email, finance_email]
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteClient = async id => {
  const token = await verifyGreenInvoiceToken();
  try {
    const res = await axios.delete(
      `https://sandbox.d.greeninvoice.co.il/api/v1/clients/${id}`,

      { headers: { Authorization: "Bearer " + token } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/*------------------------suppliers------------------------------*/
export const getSupplier = async id => {
  const token = await verifyGreenInvoiceToken();
  try {
    const res = await axios.get(
      `https://sandbox.d.greeninvoice.co.il/api/v1/suppliers/${id}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addSupplier = async newSupplier => {
  const token = await verifyGreenInvoiceToken();
  const {
    official_name,
    number,
    contact_person,
    phone_number,
    email,
    address,
    country,
    send_invoice_auto,
    finance_contact,
    finance_email,
    currency,
    payment_terms
  } = newSupplier;
  try {
    const res = await axios.post(
      `https://sandbox.d.greeninvoice.co.il/api/v1/suppliers`,
      {
        name: official_name,
        active: true,
        accountingKey: number,
        paymentTerms: 0,
        address,
        country,
        phone: phone_number,
        contactPerson: contact_person,
        emails: [email, finance_email]
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateSupplier = async updSupplier => {
  const token = await verifyGreenInvoiceToken();
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
    send_invoice_auto
  } = updSupplier;
  try {
    const res = await axios.put(
      `https://sandbox.d.greeninvoice.co.il/api/v1/suppliers/${updSupplier.id}`,
      {
        name: official_name,
        active: true,
        accountingKey: number,
        paymentTerms: 0,
        address,
        country,
        phone: phone_number,
        contactPerson: contact_person,
        emails: [email, finance_email]
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSupplier = async id => {
  const token = await verifyGreenInvoiceToken();
  try {
    const res = await axios.delete(
      `https://sandbox.d.greeninvoice.co.il/api/v1/suppliers/${id}`,

      { headers: { Authorization: "Bearer " + token } }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
