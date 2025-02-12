export const contactEmailTemplate = (name, email, phone, message) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .email-container {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    text-align: center;
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    color: #555;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h1>Contact Details</h1>
                <p><strong>Name:</strong> ${name} </p>
                <p><strong>Sender Email:</strong> ${email} </p>
                <p><strong>Phone:</strong> ${phone} </p>
                <p><strong>Message:</strong> ${message} </p>
            </div>
        </body>
        </html>
    `
}
