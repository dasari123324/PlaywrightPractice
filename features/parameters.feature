Feature: Testing out parameterization.
    @Parameters
    Scenario Outline: Logging in with different users.
    Given the user is logged in to the eCommerce2 application with "<username>" and "<password>"
    Then Error Message will be displayed  

    Examples:
    | username                | password   |
    | qaswed                  | Qwerty     |
    | qwdqwd                  | Qwerty     |
    | rahulshettyacademy      | learning   |