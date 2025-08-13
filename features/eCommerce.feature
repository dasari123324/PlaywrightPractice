Feature:ECommerce Validations
        Here we are validating the eCommerce application where we are adding an item to the cart and purchasing it.
        @RegressionTestScenario
        @eCommerce
    Scenario: Placing the Order
        Given the user is logged in to the eCommerce application with "dasarisantosh07@gmail.com" and "Qwerty@123" 
        When the user adds item "IPHONE 13 PRO" to the cart
        Then Verify "IPHONE 13 PRO" is displayed in the cart
        When Enter valid details and place the order
        Then Verify if the order is present in the order history

    # Added this scenario to check if we can run them parallely with other scenarios.
    Scenario Outline: Logging in with different users.
        Given the user is logged in to the eCommerce2 application with "<username>" and "<password>"
        Then Error Message will be displayed  

        Examples:
        | username                | password   |
        | qaswed                  | Qwerty     |
        | qwdqwd                  | Qwerty     |
        | rahulshettyacademy      | learning   |
    
    # Added this scenario to check if we can run them parallely with other scenarios.
    Scenario: To Verify that error message is displayed when logged in with invalid credentials.
        Given the user is logged in to the eCommerce2 application with "dasarisantosh07@gmail.com" and "Qwerty" 
        Then Error Message will be displayed  