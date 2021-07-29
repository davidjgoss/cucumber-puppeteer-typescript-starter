Feature: Adding todos

  Scenario:
    Given an empty todo list
    When I add the todo "buy some cheese"
    Then the todos are:
      | buy some cheese |
    And my cursor is ready to create a todo
