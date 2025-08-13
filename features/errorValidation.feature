Feature: ECommerce2 Login Validations
    @ValidationTestScenario
    @eCommerce2
    Scenario: To Verify that error message is displayed when logged in with invalid credentials.
        Given the user is logged in to the eCommerce2 application with "dasarisantosh07@gmail.com" and "Qwerty" 
        Then Error Message will be displayed  

