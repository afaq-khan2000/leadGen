module.exports.BasicTemplate = ({
  templateDetails,
  id,
  date,
  invoice_no,
  status,
  type,
  invoice_term,
  contract_tearms,
  Customer,
  notes,
  services,
  subtotal,
  tax,
  net_amount,
  paid_amount,
  imgUri,
  link,
}) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
        rel="stylesheet">
    <title>Invoice</title>
    <style>
        body {
            font-family: 'Rubik', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;


        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
            /* To clear float and contain child elements */
        }

        .header {
            text-align: left;
            overflow: hidden;
            /* To contain child elements */
        }

        .header .company-name {
            width: 48%;
            float: left;
        }

        .header img {
            width: 100px;
            float: right;
        }

        .customer-details,
        .invoice-details {
            margin-top: 20px;
        }

        .customer-details div,
        .invoice-details div {
            width: 48%;
            display: inline-block;
            vertical-align: top;
        }

        .invoice-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        .invoice-table th,
        .invoice-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .note {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container"
        style="max-width: 600px; margin: 20px auto; padding: 80px; border: 1px solid {{ borderColor }}; border-radius: 8px; overflow: hidden;">
        <div class="header" style="text-align: left; overflow: hidden;">
            <div class="company-name"
                style="width: 48%; display: inline-block; vertical-align: top; font-size: 25px; font-weight: bold;">
                ${type == "estimation" ? "Estimation" : "Invoice"}</div>
            <div><img src="${imgUri}" alt="Company Logo" style="width: 100px; float: right; margin-right: 30px;">
            </div>
        </div>

        <br><br><br>

        <div class="customer-details" style="margin-top: 20px;">
            <div style="width: 48%; display: inline-block; vertical-align: top; font-size: small; color: gray;">
                <strong style="font-size: medium; color: black;">Customer Details</strong><br>
                ${Customer?.first_name || "JOHN"} ${
  Customer?.last_name || "SMITH"
}<br>
                ${Customer?.address_one || ""} ${Customer?.address_two} <br>
                ${Customer?.email || "customer@gmail.com"}
            </div>
            <div style="width: 48%; display: inline-block; vertical-align: top;">
                <strong>Invoice Details</strong><br>
                ${type == "Estimation" ? "Estimate" : "Invoice"} #: ${
  invoice_no ?? id
}<br>
                Date: ${date}<br>
                ${
                  type == "Estimation"
                    ? contract_tearms && `Terms:${contract_tearms}`
                    : invoice_term && `Due Date:${invoice_term}`
                }
            </div>
        </div>

        <br><br><br>

        <table class="invoice-table" style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${services.join("")}
                <!-- Add similar rows for other services -->
            </tbody>
        </table>

        <br><br>

        <div class="invoice-details" style="margin-top: 20px;">
            <div style="width: 48%; display: inline-block; vertical-align: top">
                Subtotal: ${subtotal - paid_amount}<br>
                Tax: ${tax}<br>
                Total Amount: ${net_amount - paid_amount} <br>
            </div>
        </div>

        <br><br><br>

        <div class="note" style="margin-top: 20px;">
            <strong>Note:</strong><br>
            ${
              notes
                ? notes
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi\
            tristique senectus et netus et malesuada fames ac turpis egestas. Nunc dapibus, eros at accumsan congue,\
            elit magna euismod velit,nec tristique nisl justo ut makeUserName"
            }
        </div>
        <br><br>
        ${
          type == "estimation"
            ? `<a href=${link}><button> Click to Sign </button></a>`
            : status != "completed"
            ? `<a href=${link}><button> Pay Now </button></a>`
            : ""
        }
        
    </div>
</body>

</html>
`;
