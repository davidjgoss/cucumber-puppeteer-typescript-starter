Feature: Empty

  Scenario: simpler ui
    Given an empty todo list
    Then no todos are listed

  Scenario: autofocus
    Given an empty todo list
    Then my cursor is ready to create a todo
