const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// const getToken = (async () => {
//     try {
//         const res = await axios.post(
//             `https://sandbox.d.greeninvoice.co.il/api/v1/account/token`,
//             {
//                 id: "fb97a7c6-7043-44ba-953a-f7ae01bef141",
//                 secret: "8zeZwAQFBGJx77zR6Ss4XA"
//             }
//         );
//         console.log("get token res ", res.data);
//         return res.data;
//     } catch (error) {
//         console.log("token error",error);
//     }
// })

const getToken = async () => {
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

const verifyGreenInvoiceToken = async () => {
    return admin.firestore().collection('GItoken').doc('token').get().then(async doc => {
        if (!doc.exists) {
            const { token, expires } = await getToken();
            admin.firestore().collection('GItoken').doc('token').set({ token, expires });
            return token;
        } else {
            const { token, expires } = doc.data();
            const currentTime = Date.now() / 1000;
            if (expires < currentTime) {
                const { token, expires } = await getToken();
                admin.firestore().collection('GItoken').doc('token').set({ token, expires });
                return token;
            } else {
                return token;
            }

        }
    })
        .catch(err => {
            console.log('Error getting document', err);
        });


};

const addDocument = (async (project, expenses) => {
    const { token } = await verifyGreenInvoiceToken();
    console.log("calling API DOCUMENT", token, project, expenses)
    // try {
    //     const res = await axios.post(
    //         `https://sandbox.d.greeninvoice.co.il/api/v1/documents`,
    //         {
    //             'description': 'Just an order',
    //             'remarks': 'Some remarks',
    //             'footer': 'Texts in footer',
    //             'emailContent': 'Email content',
    //             'type': 300,
    //             'date': '2019-11-28',
    //             'dueDate': '2019-11-30',
    //             'lang': 'he',
    //             'currency': 'ILS',
    //             'vatType': 0,
    //             'discount': {
    //                 'amount': 1,
    //                 'type': 'sum'
    //             },
    //             'rounding': true,
    //             'signed': true,
    //             'attachment': true,
    //             'maxPayments': 1,
    //             'paymentRequestData': {
    //                 'plugins': [
    //                     {
    //                         'id': '031e827a-c664-c1e4-d231-a80027271123'
    //                     }
    //                 ],
    //                 'maxPayments': 1
    //             },
    //             'client': {
    //                 'id': 'bex0U0RAThPVa1M8ZE0m',
    //             },
    //             'payment': [
    //                 {
    //                     'date': '2016-03-21',
    //                     'type': 2,
    //                     'price': 300,
    //                     'currency': 'ILS',
    //                     'currencyRate': 1,
    //                     'bankName': 'My Bank',
    //                     'bankBranch': '198',
    //                     'bankAccount': '212435',
    //                     'chequeNum': '10002',
    //                     'accountId': 'TFGFFGSYYE',
    //                     'transactionId': 'TGBBBXNLKS75SKJS',
    //                     'appType': 1,
    //                     'subType': 1,
    //                     'cardType': 2,
    //                     'cardNum': '8765',
    //                     'dealType': 2,
    //                     'numPayments': 1,
    //                     'firstPayment': 10
    //                 }
    //             ]
    //         },
    //         { headers: { Authorization: "Bearer " + token, 'Content-Type': 'application/json' } }
    //     );
    //     console.log("resonce data", res)
    //     return res.data;
    // } catch (error) {
    //     console.log("error ", error);
    // }
})

const getProjectsByType = ((type) => {
    console.log("featching project")
    return admin.firestore().collection("projects").where("business_modle", "==", type)
        .get()
        .then(snapshot => {
            return snapshot.docs.map(doc => {
                const project = { id: doc.id, ...doc.data() };
                return admin.firestore().collection("expenses").where("project_id", "==", project.id).get().then(snapshot => {
                    return snapshot.docs.map(doc => {
                        const expenses = { id: doc.id, ...doc.data() };
                        return addDocument(project, expenses);
                    })
                }
                )
                // return addDocument(project);
            });
        });
})


// exports.scheduledBiilingRetainer = functions.pubsub.schedule('16 09 * * *').onRun((context) => {
//     console.log('This will be run every day at 11:05 AM UTC!');
//     return getProjectsByType('TM_monthly')
// });

exports.scheduledBiilingRetainer = functions.https.onRequest((request, response) => {
    console.log("hey called ")
    return getProjectsByType('TM_monthly')
    // response.send( getProjectsByType('TM_monthly') );
});