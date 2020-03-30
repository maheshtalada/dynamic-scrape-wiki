@homepage
Feature:
  - When I open home
  - show

  @LaunchApp
  Scenario Outline: Home page for logged out user
    Given I have launched the application for '<uri>'
    Then Launch Registration as '<userType>' for '<userText>'

    Examples:
      |uri|userType|userText|
      |/?site=US|UserTypeOwner|Investor or Owner|


  @register
  Scenario Outline: Open Register page
    Then Launch Registration as <userType> for <userText>

    Examples:
      |userType|userText|
      |UserTypeOwner|Buyer or Owner|

  @AnonymousHome
  Scenario Outline: Home page for logged out user
    Then I see 'SiteSwitchDropDown' on 'HeaderNavigation'
    Then I see 'LanguageSwitchDropDown' on 'HeaderNavigation'
    Then I see 'LoginLink' on 'HeaderNavigation'
    Then I see 'RegisterLink' on 'HeaderNavigation'
    Then I see 'CreateListingLink' on 'HomePage'
    Then I see 'CreateArticleLink' on 'HomePage'
    Then I see 'AskTheExpertsLink' on 'HomePage'

  @LoggedIn
  Scenario Outline: Login user
    Then Login to Application using the username '<username>' and password '<password>'
    Then I see text as '<user>' in 'ProfileName' on 'HeaderNavigation'

    Examples:
      |username|password|user|
      |mtalada@propshub.com|123456|Mahesh|

  @SearchPropertyforSale
  Scenario Outline: Search Property for sale
    Then I search for address '<searchTerm>' for specific search type '<searchOption>'
    Then I verify the length for 'MatchingAddressResults' on 'LocationSearchAutocomplete'
    And I wait for '6' second on 'LocationSearchAutocomplete'
    And I verify the length for 'MatchingPropertiesResults' on 'LocationSearchAutocomplete'

    Examples:
      |searchTerm|searchOption|
      |los altos, CA|ForSaleSearchOption|

  @SearchPropertyforLease
  Scenario Outline: Search Property for lease
    Then I search for address '<searchTerm>' for specific search type '<searchOption>'
    Then I verify the length for 'MatchingAddressResults' on 'LocationSearchAutocomplete'
    And I wait for '6' second on 'LocationSearchAutocomplete'
    And I verify the length for 'MatchingPropertiesResults' on 'LocationSearchAutocomplete'

    Examples:
      |searchTerm|searchOption|
      |los altos, CA|ForLeaseSearchOption|

  @RealtorSearchOption
  Scenario Outline: Search Realtor
    Then I search for address '<searchTerm>' for specific search type '<searchOption>'
    Then I verify the length for 'MatchingAddressResults' on 'LocationSearchAutocomplete'

    Examples:
      |searchTerm|searchOption|
      |los altos, CA|RealtorSearchOption|

  @ProfessionalSearchOption
  Scenario Outline: Search Professional
    Then I search for address '<searchTerm>' for specific search type '<searchOption>'
    Then I verify the length for 'MatchingAddressResults' on 'LocationSearchAutocomplete'

    Examples:
      |searchTerm|searchOption|
      |los altos, CA|ProfessionalSearchOption|

  @SiteSwitch
  Scenario Outline: Site Switch
    Then I click on 'SiteSwitchDropDown' on 'HeaderNavigation'
    Then I see value as '<country>' on 'HeaderNavigation'

    Examples:
      |country|
      |USA|

  @LanguageSwitch
  Scenario Outline: Language Switch
    Then I click on 'LanguageSwitchDropDown' on 'HeaderNavigation'
    Then I see value as '<language>' on 'HeaderNavigation'

    Examples:
      |language|
      |English|


