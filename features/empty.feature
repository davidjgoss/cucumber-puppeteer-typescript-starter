Feature: Empty

  Scenario: simpler ui
    Given an empty todo list
    Then no todos are listed
    And unnecessary controls are hidden

  Scenario: autofocus
    Given an empty todo list
    Then my cursor is ready to create a todo
