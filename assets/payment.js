function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const userId = urlParams.get("user_id");
const orderId = userId + "-" + makeid(4);

if (window.location.search.indexOf("user_id") > -1) {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user_id");
  const firstName = urlParams.get("name");
  const lastName = urlParams.get("surname");
  const orderId = userId + "-" + makeid(4);
  const price = "199";

  const merchUrl = "https://krug-vpn.com";
  const merchId = "21956";
  const requestId = orderId;
  const reqestBody = `{
    "PaymentRequest": {
        "OrderId": ${orderId},
        "Amount": ${price},
        "Currency": "RUB",
        "ExtraData": {},
        "Description": "string",
        "RebillFlag": false
    },
    "CustomerInfo": {
        "FirstName": ${firstName},
        "LastName": ${lastName}
    }
}`;

  debugger;

  this.pay = function () {
    var widget = new pw.PayWidget();
    console.log("PAY"); // вызов метода одностадийной оплаты
    widget.pay(
      {
        // serviceId - Идентификатор ТСП
        serviceId: "21956",
        // key - public key из личного кабинета мерчанта
        key: "04a9ab78f8cbd9cf2515424da00d76df477763e2f363703c12dbd69b79a6d5296979213e868360ad44ac69ed95f4b17041058642304849e5b8bc3588eba1b3f154",
        // logger -  для включения расширенного логирования при отладке
        logger: true,
      },
      // Запрос с минимальным количеством параметров
      {
        MetaData: {
          PaymentType: "Pay", //метод одностадийной оплаты
        },
        PaymentRequest: {
          OrderId: orderId, //идентификатор заказа
          Amount: "199", //сумма платежа
          Currency: "RUB", //валюта
          Description: "Оплата ключа - 1 месяц", //назначение платежа
        },
      },
      // Запрос с максимальным количеством параметров
      // См. запрос Create
      {
        // Варианты событий, которые могут приходить по колбекам (уведомлениям):
        onSuccess: function (res) {
          console.log("onSuccess from shop", res);
        }, // для onSuccess -> PAY_WIDGET:TRANSACTION_SUCCESS,PAY_WIDGET:CLOSE_AFTER_SUCCESS

        onError: function (res) {
          console.log("onFail from shop", res);
        }, // для onError -> PAY_WIDGET:TRANSACTION_FAIL,PAY_WIDGET:CREATE_NETWORK_ERROR, PAY_WIDGET:CREATE_BAD_REQUEST_ERROR, PAY_WIDGET:CLOSE_AFTER_FAIL,PAY_WIDGET:CLOSE_AFTER_CREATE_NETWORK_ERROR, PAY_WIDGET:CREATE_BAD_REQUEST_ERROR

        onClose: function (res) {
          console.log("onClose from shop", res);
        }, // для onClose -> PAY_WIDGET:CLOSE_BEFORE_PAY
      },
      { only2Level: true } // необязательный параметр, необходим для корректной работы при наличии сайтов с поддоменами
    );
  };
} else {
  // alert("track not here");
}
