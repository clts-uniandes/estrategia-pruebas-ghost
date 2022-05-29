Feature: Login, creacion de tag y eliminacion del tag creado

  @user1 @web
  Scenario: As a user I want to delete a tag that I previously have created
    Given I navigate to page "<LOGIN_URL>"
    And I take a screenshot on "PA009"
    When I login with "<USERNAME>" and "<PASSWORD>"
    And I take a screenshot on "PA009"
    And I wait
    Then I expect that url contain "#/site"
    When I click on tags in the navbar
    And I take a screenshot on "PA009"
    And I wait for 2 seconds
    Then I expect that url contain "#/tags"
    When I click on new tag
    And I take a screenshot on "PA009"
    And I wait for 2 seconds
    Then I expect that url contain "#/tags/new"
    When I enter tag name "tag to delete"
    And I take a screenshot on "PA009"
    And I wait for 2 seconds
    And I enter tag color "000088"
    And I take a screenshot on "PA009"
    And I wait for 2 seconds
    And I enter tag description "tag to delete"
    And I take a screenshot on "PA009"
    And I click on save tag
    And I take a screenshot on "PA009"
    And I wait for 2 seconds
    And I return to tags list
    And I take a screenshot on "PA009"
    Then I expect tag created with name "tag to delete"
    When I click on link having href "#/tags/tag-to-delete/"
    And I take a screenshot on "PA009"
    And I click in delete tag
    And I take a screenshot on "PA009"
    And I wait for 2 seconds
    And I click on delete button
    And I take a screenshot on "PA009"
    And I wait for 3 seconds
    Then I expect to go back to tag list
    And I take a screenshot on "PA009"
