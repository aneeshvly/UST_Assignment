
@FormFill
Feature: Experian Employer Service

    This is the sample project for the assignment

    Scenario: Launch the application
        Given Launch the application
        Then Verify the application launched successfully

    Scenario Outline: Verify the blank field validation
        When Click on the next button
        Then Verify the mandatory field validation for the "<Field Name>"

        Examples:
            | Field Name     |
            | First Name     |
            | Last Name      |
            | Street Address |
            | City           |
            | Zip Code       |

    Scenario: Verify the zipcode format validation
        When Enter the wrong zipcode "wrong zip"
        When Click on the next button
        Then Verify the validation message is correct or not

    Scenario Outline: Enter the personal details
        Given Enter the personal details "<Field Name>"
        Examples:
            | Field Name     |
            | First Name     |
            | Last Name      |
            | Email Address  |
            | Street Address |
            | City           |
            | Zip Code       |

    Scenario Outline: Verify the page navigation to questionnaire page
        When Click on the next button
        Then Verify the page navigation to the questionnaire page


    Scenario Outline: Verify the validation for the page navigation without answering the questions
        When Click on the next button
        Then Verify the validation message for the question "<Question>"
        Examples:
            | Question                                                                                                                                          |
            | In the last year, have you or anyone you've lived with received SNAP (Supplemental Nutrition Assistance Program also referred to as food stamps)? |
            | In the last two years, have you or anyone you've lived with received TANF (Temporary Assistance for Needy Families also referred to as welfare)?  |
            | Are you a veteran of the U.S. Military/Armed Forces?                                                                                              |
            | Are you a person who has a disability?                                                                                                            |
            | Have you ever been convicted of a felony?                                                                                                         |
            | Have you collected unemployment benefits at any time during your unemployment period?                                                             |


    Scenario Outline: Answer the sample questions
        When Read the "<Question>" and choose the right "<Answer>"

        Examples:
            | Question                                                                                                                                          | Answer |
            | In the last year, have you or anyone you've lived with received SNAP (Supplemental Nutrition Assistance Program also referred to as food stamps)? | No     |
            | In the last two years, have you or anyone you've lived with received TANF (Temporary Assistance for Needy Families also referred to as welfare)?  | No     |
            | Are you a veteran of the U.S. Military/Armed Forces?                                                                                              | No     |
            | Are you a person who has a disability?                                                                                                            | No     |
            | Have you ever been convicted of a felony?                                                                                                         | No     |
            | Have you collected unemployment benefits at any time during your unemployment period?                                                             | No     |

    Scenario: Verify the page navigatioon to the summary page after submission
        When Click on the next button
        Then Verify the page navigation to the additional information page


    Scenario: Verify the first name and last name of the employee
        Then Verify the first name and last name of the employee

    Scenario: Verify the page navigation and verify the URL
        When Click on the submit button
        Then Verify the URL of the new page