@test
Feature: Github test
    As a Developer in Test
    I want to search for webdriverio repository
    So that I can use it in my future tests

    Scenario: open URL
        Given I open the url "/"
        And   I pause for 1000ms
        When  I click on the button ".hamburger-icon button"
