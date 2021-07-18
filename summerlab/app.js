function payWithPaystack() {

    var handler = PaystackPop.setup({ 
        key: 'pk_live_bd5356607a881f3a0d6843b75d3172b74b9675cd', //put your public key here
        email: 'customer@email.com', //put your customer's email here
        amount: 1200, //amount the customer is supposed to pay
        metadata: {
            custom_fields: [
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+233248677955" //customer's mobile number
                }
            ]
        },
        currency : "GHS",
        callback: function (response) {
            //after the transaction have been completed
            //make post call  to the server with to verify payment 
            //using transaction reference as post data
            $.post("verify.php", {reference:response.reference}, function(status){
                if(status == "success")
                    //successful transaction
                    alert('Transaction was successful');
                else
                    //transaction failed
                    alert(response);
            });
        },
        onClose: function () {
            //when the user close the payment modal
            alert('Transaction cancelled');
        }
    });
    handler.openIframe(); //open the paystack's payment modal
}