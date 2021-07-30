Feature: Adding todos

  Scenario: Adding several todo items
    Given an empty todo list
    When I add the todo "buy some cheese"
    Then the todos are:
      | buy some cheese |
    When I add the todo "buy some milk"
    Then the todos are:
      | buy some cheese |
      | buy some milk   |

    Scenario: Input is cleared and focused after adding a todo
      Given an empty todo list
      When I add the todo "buy some cheese"
      Then the todo input is empty
      And my cursor is ready to create a todo
