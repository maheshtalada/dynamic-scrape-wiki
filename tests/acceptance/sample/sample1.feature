@registerpage
Feature:
  - When I Open Register
  - show

  @LaunchRegisterUser
  Scenario Outline: Register page for logged out user
    Given I have launched the application for '<uri>'
    Then I see 'PageTitle' on '<memberTitle>'

    Examples:
      |uri|memberTitle|
      |/register/users?site=US|Sign up as a member|

  @RegisterUser
  Scenario Outline: Register User
    Then I enter '<username>' in 'username' on 'RegisterUser'
    Then I enter mobile number '<mobilenumber>' in 'mobilenumber' on 'RegisterUser'
    Then I enter '<emailid>' in 'emailid' on 'RegisterUser'
    Then I enter '<password>' in 'password' on 'RegisterUser'
    Then I click on 'termsandconditions' on 'RegisterUser'


    Examples:
      |username|mobilenumber|emailid|password|
      |testuser1|65|testuser1@yopmail.com|123456|

  @LaunchRegisterRealtor
  Scenario Outline: Register page for logged out realtor
    Given I have launched the application for '<uri>'
    Then I see 'PageTitle' on '<realtorTitle>'

    Examples:
      |uri|realtorTitle|
      |/register/realtors?site=US|Sign up as a Realtor|

  @RegisterRealtor
  Scenario Outline: Register Realtor
    Then I enter '<username>' in 'username' on 'RegisterRealtor'
    Then I enter mobile number '<mobilenumber>' in 'mobilenumber' on 'RegisterRealtor'
    Then I enter '<emailid>' in 'emailid' on 'RegisterRealtor'
    Then I enter '<password>' in 'password' on 'RegisterRealtor'
    Then I enter '<areasserved>' in 'areasserved' on 'RegisterRealtor'
    Then I enter '<professionalsince>' in 'professionalsince' on 'RegisterRealtor'
    Then I enter '<specialties>' in 'specialties' on 'RegisterRealtor'
    Then I enter '<areasofexpertise>' in 'areasofexpertise' on 'RegisterRealtor'
    Then I enter '<about>' in 'about' on 'RegisterRealtor'
    Then I click on 'termsandconditions' on 'RegisterRealtor'
    Then I submit form using element 'SignUpButton' of 'RegisterRealtor'
    And I wait for '6' second on 'HeaderNavigation'
    Then I see 'PageTitle' on '<otptitle>'
    Then I enter '<otp>' in 'otp' on 'VerifyOTP'
    Then I click on 'VerifyOtpButton' on 'VerifyOTP'
    Then I see '<username>' in 'profilename' in 'HeaderNavigation'
    Then I click on 'LogoutLink' in 'HeaderNavigation'
    And I wait for '6' second on 'HeaderNavigation'
    Then I see 'LoginLink' on 'HeaderNavigation'

    Examples:
      |username|mobilenumber|emailid|password|areasserved|professionalsince|specialties|areasofexpertise|about|otptitle|otp|
      |testrealtor1|85|testrealtor1@yopmail.com|123456|Los Altos, CA|2012|Legal|Buying and Selling|Your Trusted Realtor|Verify OTP|1234|

  @LaunchRegisterProfessional
  Scenario Outline: Register page for logged out professional
    Given I have launched the application for '<uri>'
    Then I see 'PageTitle' on '<professionalTitle>'

    Examples:
      |uri|professionalTitle|
      |/register/professionals?site=US|Sign up as a Service Provider or Professional|

  @RegisterProfessional
  Scenario Outline: Register Professional
    Then I enter '<username>' in 'username' on 'RegisterProfessional'
    Then I enter mobile number '<mobilenumber>' in 'mobilenumber' on 'RegisterProfessional'
    Then I enter '<emailid>' in 'emailid' on 'RegisterProfessional'
    Then I enter '<password>' in 'password' on 'RegisterProfessional'
    Then I enter '<areasserved>' in 'areasserved' on 'RegisterProfessional'
    Then I enter '<professionalsince>' in 'professionalsince' on 'RegisterProfessional'
    Then I enter '<professions>' in 'professions' on 'RegisterProfessional'
    Then I enter '<areasofexpertise>' in 'areasofexpertise' on 'RegisterProfessional'
    Then I enter '<about>' in 'about' on 'RegisterProfessional'
    Then I click on 'termsandconditions' on 'RegisterRealtor'
    Then I submit form using element 'SignUpButton' of 'RegisterProfessional'
    And I wait for '6' second on 'HeaderNavigation'
    Then I see 'PageTitle' on '<otptitle>'
    Then I enter '<otp>' in 'otp' on 'VerifyOTP'
    Then I click on 'VerifyOtpButton' on 'VerifyOTP'
    Then I see '<username>' in 'profilename' in 'HeaderNavigation'
    Then I click on 'LogoutLink' in 'HeaderNavigation'
    And I wait for '6' second on 'HeaderNavigation'
    Then I see 'LoginLink' on 'HeaderNavigation'

    Examples:
      |username|mobilenumber|emailid|password|areasserved|professionalsince|professions|areasofexpertise|about|otptitle|otp|
      |testprofessional1|75|testprofessional1@yopmail.com|123456|Los Altos, CA|2012|Plumber|Kitchen and Bathroom Plumbing|Your Friendly Neighborhood Plumber|Verify OTP|1234|

